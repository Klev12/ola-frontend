import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import {
  createFormGroup,
  deleteFormGroupById,
} from "../../services/form-group-service";
import { getFormSchemeById } from "../../services/form-scheme";
import { Card } from "primereact/card";
import SelectTypeField from "./components/SelectTypeField";
import { createField } from "../../services/field-service";
import { Dropdown } from "primereact/dropdown";

const EditForm = () => {
  const { id: formSchemeId } = useParams();
  const { data: formSchemeData, refetch: refetchFormScheme } = useQuery({
    queryFn: () =>
      getFormSchemeById(formSchemeId as string).then((res) => res.data),
  });
  const { mutate: createFormGroupMutate } = useMutation(createFormGroup, {
    onSuccess: () => {
      refetchFormScheme();
    },
  });

  const { mutate: deleteFormGroupByIdMutate } = useMutation(
    deleteFormGroupById,
    {
      onSuccess: () => {
        refetchFormScheme();
      },
    }
  );

  const { mutate: createFieldMutate } = useMutation(createField, {
    onSuccess: () => {
      refetchFormScheme();
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputText placeholder="Título del formulario" />
      <Button
        label="crear grupo+"
        onClick={() => {
          createFormGroupMutate({
            form_scheme_id: formSchemeId as string,
            label: "default text",
          });
        }}
      />
      {formSchemeData?.form_scheme.form_groups.map((formGroup) => {
        return (
          <Card title={formGroup.label}>
            <Button
              label="Eliminar"
              onClick={() => deleteFormGroupByIdMutate(formGroup.id)}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = Object.fromEntries(
                  new FormData(e.target as HTMLFormElement)
                );
                createFieldMutate({
                  component: formData["type"] as string,
                  label: "default field",
                  form_group_id: formGroup.id as number,
                  metadata: JSON.stringify({ type: "string" }),
                  required: false,
                });
              }}
            >
              <label>Tipo</label>
              <SelectTypeField />
              <Button>Añadir campo + </Button>
            </form>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {formGroup.fields.map((field) => {
                if (field.component === "input") {
                  return (
                    <div>
                      <div>{field.label}</div>
                      <InputText />
                    </div>
                  );
                }
                if (field.component === "select") {
                  return (
                    <div>
                      <div>{field.label}</div>
                      <Dropdown />
                    </div>
                  );
                }
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default EditForm;
