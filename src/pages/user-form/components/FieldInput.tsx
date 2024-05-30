import { Field } from "../../../models/form-scheme";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import SelectField from "./SelectField";
import CheckBoxField from "./CheckBoxField";
import CalendarField from "./CalendarField";
import "../styles/styles.css";

interface FieldProps {
  field: Field;
}

const FieldInput = ({ field }: FieldProps) => {
  return (
    <div className="field-input">
      {field.component === "input" && field.metadata.type === "string" && (
        <div>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          <InputText
            required={field.required}
            defaultValue={field.results[0]?.response?.value}
            id={`I${field.label}`}
            name={field.id as string}
          />
        </div>
      )}

      {field.component === "input" && field.metadata.type === "number" && (
        <>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          <InputNumber
            required={field.required}
            value={
              Number(field.results?.[0]?.response?.value?.replace(/,/g, "")) ||
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
        <div>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          <InputText
            required={field.required}
            defaultValue={field.results[0]?.response?.value}
            id={`I${field.label}`}
            name={field.id as string}
          />
        </div>
      )}
      {field.component === "check" && (
        <div className="input-group">
          <CheckBoxField field={field} />
        </div>
      )}
    </div>
  );
};

export default FieldInput;
