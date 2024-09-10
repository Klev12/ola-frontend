import { useMutation, useQuery } from "react-query";
import {
  createNewTest,
  deleteTestById,
  getAllTests,
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

const Tests = () => {
  const showDialog = useToggle();

  const { data: testsData, refetch } = useQuery({
    queryFn: () => getAllTests().then((res) => res.data),
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

  const navigate = useNavigate();

  return (
    <div style={{ padding: "10px" }}>
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
      <Button
        label="Crear nueva prueba"
        icon={PrimeIcons.PLUS}
        onClick={() => {
          showDialog.setTrue();
        }}
      />
      <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
        {testsData?.tests?.map((test) => {
          return (
            <Card key={test.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  padding: "20px",
                }}
              >
                <Button
                  rounded
                  icon={PrimeIcons.TIMES}
                  onClick={() => {
                    deleteTestByIdMutate({ id: test.id as number });
                  }}
                />
              </div>
              <Inplace closable>
                <InplaceDisplay>
                  <h2>{test.title || "Click to Edit"}</h2>
                </InplaceDisplay>
                <InplaceContent>
                  <InputText defaultValue={test.title} name="title" autoFocus />
                  <Button label="subir cambios" />
                </InplaceContent>
              </Inplace>
              <Button
                label="Editar prueba"
                onClick={() => {
                  navigate(ROUTES.TESTS.EDIT_FORM_ID(test.id));
                }}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Tests;
