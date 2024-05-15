import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useState, useEffect } from "react";

interface Field {
  id: number;
  label: string;
  component: string;
  metadata: {
    type: string;
  };
}

interface FormGroup {
  id: number;
  label: string;
  form_id: number;
  fields: Field[];
}

interface Form {
  id: number;
  label: string;
  form_groups: FormGroup[];
}

interface BackendData {
  forms: Form[];
}

interface Props {
  onFormSubmit?: (data: FormDataType) => void;
}

interface FormDataType {
  [key: string]: string;
}

const DataPerson: React.FC<Props> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<FormDataType>({});
  const [fieldsToShow, setFieldsToShow] = useState<Field[]>([]);

  useEffect(() => {
    // Simulando la información del backend
    const backendData: BackendData = {
      forms: [
        {
          id: 1,
          label: "Formulario Ola",
          form_groups: [
            {
              id: 1,
              label: "Información referencial",
              form_id: 1,
              fields: [
                {
                  id: 1,
                  label: "Ciudad",
                  component: "input",
                  metadata: { type: "text" },
                  form_group_id: 1,
                },
                {
                  id: 2,
                  label: "Fecha",
                  component: "input",
                  metadata: { type: "date" },
                  form_group_id: 1,
                },
              ],
            },
          ],
        },
      ],
    };

    // Encontrar el formulario "Formulario Ola"
    const formularioOla: Form | undefined = backendData.forms.find(
      (form) => form.label === "Formulario Ola"
    );
    if (formularioOla) {
      // Encontrar los campos del grupo de formulario "Información referencial"
      const informacionReferencialGroup: FormGroup | undefined =
        formularioOla.form_groups.find(
          (group) => group.label === "Información referencial"
        );
      if (informacionReferencialGroup) {
        setFieldsToShow(informacionReferencialGroup.fields);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: number
  ) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [fieldId]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="card flex justify-content-center">
        {fieldsToShow.map((field: Field) => (
          <FloatLabel key={field.id}>
            <InputText
              id={`field_${field.id}`} // Usando un ID único para cada campo
              value={formData[field.id.toString()] || ""}
              onChange={(e) => handleInputChange(e, field.id)}
            />
            <label htmlFor={`field_${field.id}`}>{field.label}</label>
          </FloatLabel>
        ))}
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default DataPerson;
