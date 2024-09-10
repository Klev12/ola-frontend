import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { getTestById, markTestAsPublished } from "../../services/test-service";
import EditSelectOptions from "./components/EditSelectOptions";
import GoBackButton from "../../components/GoBackButton";
import { Button } from "primereact/button";
import useToggle from "../../hooks/useToggle";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const EditForm = () => {
  const { id } = useParams();
  const showDialog = useToggle();

  const { data: formSchemeData, refetch: refetchFormScheme } = useQuery({
    queryFn: () => getTestById({ id: Number(id) }).then((res) => res.data),
    queryKey: ["form-scheme", id],
  });

  const { mutate: markTestAsPublishedMutate } = useMutation(
    markTestAsPublished,
    {
      onSuccess: () => {
        refetchFormScheme();
      },
    }
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <GoBackButton />
      <h2>{formSchemeData?.test.title}</h2>
      <div>
        {formSchemeData?.formScheme.form_groups.map((formGroup) => {
          return (
            <div key={formGroup.id}>
              <h4>{formGroup.label}</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {formGroup.fields.map((field) => {
                  return (
                    <div
                      key={field.id}
                      style={{ border: "1px solid black", padding: "10px" }}
                    >
                      <EditSelectOptions
                        disabled={formSchemeData.test.published}
                        field={field}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Button
        disabled={formSchemeData?.test.published}
        label="Subir"
        style={{ marginTop: "20px" }}
        onClick={() => {
          confirmDialog({
            message:
              "Estar seguro de proceder (luego de aceptar no podrás editar la prueba)",
            header: "Confirmación",
            acceptLabel: "Sí",
            icon: "pi pi-exclamation-triangle",
            defaultFocus: "accept",
            accept: () => {
              markTestAsPublishedMutate(formSchemeData?.test.id as number);
            },
          });
        }}
      />
      <ConfirmDialog
        visible={showDialog.value}
        onHide={() => showDialog.setFalse()}
      />
    </div>
  );
};

export default EditForm;
