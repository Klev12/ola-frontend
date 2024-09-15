import { useMutation, useQuery } from "react-query";
import {
  createNewTest,
  deleteTestById,
  getAllTests,
  patchTest,
} from "../../services/test-service";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import useToggle from "../../hooks/useToggle";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import ROUTES from "../../consts/routes";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { useMemo, useState } from "react";
import { Tag } from "primereact/tag";
import NormalModeCard from "./components/NormalModeCard";
import gradeService from "../../services/grade-service";
import formatDate from "../../utils/format-date";
import { GradeStatus } from "../../models/grade";
import PaginatorPage from "../../components/PaginatorPage";

const Tests = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const isNormalMode = useMemo(() => {
    const normalRoles = [Roles.sales, Roles.user];
    return normalRoles.includes(authenticatedUser?.role as Roles);
  }, [authenticatedUser]);

  const showDialog = useToggle();

  const [page, setPage] = useState(0);

  const { data: testsData, refetch } = useQuery({
    queryFn: () =>
      getAllTests({
        published: isNormalMode ? "true" : "all",
        page: page + 1,
      }).then((res) => res.data),
    queryKey: ["test", page],
  });

  const { data: gradeData } = useQuery({
    queryFn: () => gradeService.findAll({}).then((res) => res.data),
    queryKey: ["grades"],
  });

  const gradeTestList = useMemo(() => {
    return (
      testsData?.tests?.map((test) => {
        const grade = gradeData?.grades?.find(
          (grade) => grade.testId === test.id
        );

        return { ...test, grade };
      }) || []
    );
  }, [testsData, gradeData]);

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
    <div style={{ padding: "10px" }}>
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
        {gradeTestList.map((test) => {
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
              {isNormalMode && (
                <NormalModeCard test={test}>
                  {test.grade?.score && (
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px",
                        alignItems: "center",
                      }}
                    >
                      {test?.grade?.status === GradeStatus.resolved && (
                        <a
                          href={ROUTES.PDF.TEST_ID(test.id as number)}
                          target="_blank"
                        >
                          Ver pdf
                        </a>
                      )}
                      {test.grade?.status === GradeStatus.resolved && (
                        <div>
                          <span>Calificación: </span>{" "}
                          <Tag value={`${test.grade.score} / ${test.score}`} />
                        </div>
                      )}
                    </div>
                  )}
                </NormalModeCard>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Tests;
