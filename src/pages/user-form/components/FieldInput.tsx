import { FloatLabel } from "primereact/floatlabel";
import { Field } from "../../../models/form-scheme";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import SelectField from "./SelectField";
import CheckBoxField from "./CheckBoxField";
import CalendarField from "./CalendarField";

interface FieldProps {
  field: Field;
}

const FieldInput = ({ field }: FieldProps) => {
  return (
    <div>
      {field.component === "input" && field.metadata.type === "string" && (
        <FloatLabel>
          <InputText
            defaultValue={field.results[0]?.response?.value}
            id={`I${field.label}`}
            name={field.id as string}
          />
          <label htmlFor={`I${field.label}`}>{field.label}</label>
        </FloatLabel>
      )}

      {field.component === "input" && field.metadata.type === "number" && (
        <>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          <InputNumber
            value={
              Number(field.results?.[0]?.response?.value?.replace(/\,/g, "")) ||
              0
            }
            id={`I${field.label}`}
            name={field.id as string}
          />
        </>
      )}

      {field.component === "input" && field.metadata.type === "date" && (
        <CalendarField field={field} />
      )}

      {field.component === "select" && <SelectField field={field} />}
      {field.component === "chip" && (
        <FloatLabel>
          <InputText
            defaultValue={field.results[0]?.response?.value}
            id={`I${field.label}`}
            name={field.id as string}
          />
          <label htmlFor={`I${field.label}`}>{field.label}</label>
        </FloatLabel>
      )}
      {field.component === "check" && <CheckBoxField field={field} />}
    </div>
  );
};

export default FieldInput;
