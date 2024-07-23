import { Field, FieldIdentifier } from "../../../models/form-scheme";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import SelectField from "./SelectField";
import CheckBoxField from "./CheckBoxField";
import CalendarField from "./CalendarField";
import "../styles/styles.css";
import useGlobalState from "../../../store/store";
import { InputTextarea } from "primereact/inputtextarea";
import TextAreaField from "./TextAreaField";

interface FieldProps {
  field: Field;
}

const FieldInput = ({ field }: FieldProps) => {
  const isEditable = useGlobalState((state) => state.isFormEditable);
  const setUserFormLastNames = useGlobalState(
    (state) => state.setUserFormLastNames
  );
  const setUserFormNames = useGlobalState((state) => state.setUserFormNames);
  return (
    <div className="field-input">
      {field.component === "input" && field.metadata.type === "string" && (
        <div>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          {Boolean(field.required) && <small>campo obligatorio*</small>}
          <InputText
            required={field.required}
            defaultValue={field.results[0]?.response?.value}
            id={`I${field.label}`}
            name={field.id as string}
            disabled={isEditable}
            onChange={(e) => {
              if (field.identifier === FieldIdentifier.names) {
                setUserFormNames(e.target.value);
              }

              if (field.identifier === FieldIdentifier.lastNames) {
                setUserFormLastNames(e.target.value);
              }
            }}
          />
        </div>
      )}

      {field.component === "input" && field.metadata.type === "number" && (
        <>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          {field.required && <small>campo obligatorio*</small>}

          <InputNumber
            required={field.required}
            disabled={isEditable}
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
        <>
          {field.required && <small>campo obligatorio*</small>}
          <CalendarField field={field} />
        </>
      )}

      {field.component === "select" && <SelectField field={field} />}
      {field.component === "chip" && (
        <div>
          <label htmlFor={`I${field.label}`}>{field.label}</label>
          {field.required && <small>campo obligatorio*</small>}

          <InputText
            required={field.required}
            disabled={isEditable}
            defaultValue={field.results[0]?.response?.value}
            id={`I${field.label}`}
            name={field.id as string}
          />
        </div>
      )}
      {field.component === "check" && (
        <div className="input-group">
          {field.required && <small> campo obligatoriodasdadads*</small>}

          <CheckBoxField field={field} />
        </div>
      )}
      {field.component === "textarea" && (
        <>
          <TextAreaField field={field} />
        </>
      )}
    </div>
  );
};

export default FieldInput;
