import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import PaginatorPage from "../../components/PaginatorPage";
import { useMutation, useQuery } from "react-query";
import { useMemo, useState } from "react";
import useToggle from "../../hooks/useToggle";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import ROUTES from "../../consts/routes";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { PrimeIcons } from "primereact/api";
import formatDate from "../../utils/format-date";
import { useNavigate } from "react-router";
import {
  createNewTest,
  deleteTestById,
  getMyTests,
  patchTest,
} from "../../services/test-service";

const TestCreation = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const isNormalMode = useMemo(() => {
    const normalRoles = [Roles.sales, Roles.user];
    return normalRoles.includes(authenticatedUser?.role as Roles);
  }, [authenticatedUser]);

  const showDialog = useToggle();

  const [page, setPage] = useState(0);

  const { data: testsData, refetch } = useQuery({
    queryFn: () =>
      getMyTests({
        published: isNormalMode ? "true" : "all",
        page: page + 1,
      }).then((res) => res.data),
    queryKey: ["test", page],
  });

  const { mutate: createNewTestMutate, isLoading: isLoadingCreateNewTest } =
    useMutation(createNewTest, {
      onSuccess: () => {
        refetch();
        showDialog.setFalse();
      },
    });

  const { mutate: deleteTestByIdMutate } = useMutation(deleteTestById, {
    onSuccess: () => {
      refetch();
      showDialog.setFalse();
    },
  });

  const { mutate: patchTestMutate } = useMutation(patchTest, {
    onSuccess: () => {
      refetch();
    },
  });

  const navigate = useNavigate();

  return (
    <div>
      <PaginatorPage
        onPage={(page) => {
          setPage(page);
        }}
        limit={10}
        total={testsData?.count}
      />
      <Dialog
        draggable={false}
        visible={showDialog.value}
        onHide={() => {
          showDialog.setFalse();
        }}
      >
        <form
          style={{ display: "grid", gap: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );
            createNewTestMutate({ title: formData["title"].toString() });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label htmlFor="">Título:</label>
            <InputText name="title" required />
          </div>
          <Button
            label="Crear nueva prueba"
            icon={PrimeIcons.PLUS}
            disabled={isLoadingCreateNewTest}
          />
        </form>
      </Dialog>
      {!isNormalMode && (
        <Button
          label="Crear nueva prueba"
          icon={PrimeIcons.PLUS}
          onClick={() => {
            showDialog.setTrue();
          }}
        />
      )}
      <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
        {testsData?.tests.map((test) => {
          return (
            <Card key={test.id}>
              {!isNormalMode && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "20px",
                      gap: "20px",
                    }}
                  >
                    <Tag value={test.status} />
                    <Button
                      rounded
                      icon={PrimeIcons.TIMES}
                      onClick={() => {
                        deleteTestByIdMutate({ id: test.id as number });
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <div>
                      <span>Creado en {formatDate(test.createdAt || "")}</span>
                      {test.startDate && (
                        <div style={{ display: "flex", gap: "20px" }}>
                          <div style={{ display: "flex", gap: "20px" }}>
                            <span style={{ fontWeight: "bold" }}>
                              Empieza en:
                            </span>
                            <span>
                              {formatDate(test.startDate, "simplified")}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: "20px" }}>
                            <span style={{ fontWeight: "bold" }}>
                              Acaba en:
                            </span>
                            <span>
                              {formatDate(test.endDate, "simplified")}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Inplace closable>
                      <InplaceDisplay>
                        <h2>{test.title || "Click to Edit"}</h2>
                      </InplaceDisplay>
                      <InplaceContent>
                        <form
                          action=""
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = Object.fromEntries(
                              new FormData(e.target as HTMLFormElement)
                            );

                            patchTestMutate({
                              testId: test.id as number,
                              title: formData["title"].toString(),
                            });
                          }}
                        >
                          <InputText
                            defaultValue={test.title}
                            name="title"
                            required
                            autoFocus
                          />
                          <Button label="subir cambios" />
                        </form>
                      </InplaceContent>
                    </Inplace>
                    {test.published && (
                      <Tag severity={"success"} value={"publicado"} />
                    )}
                  </div>
                  <Button
                    disabled={test.published}
                    label="Editar prueba"
                    onClick={() => {
                      navigate(ROUTES.TESTS.EDIT_FORM_ID(test.id));
                    }}
                  />
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TestCreation;
