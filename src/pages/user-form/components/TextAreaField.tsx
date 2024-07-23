import { InputTextarea } from "primereact/inputtextarea";
import { Field } from "../../../models/form-scheme";

interface TextAreaFieldProps {
  field: Field;
}

const TextAreaField = ({ field }: TextAreaFieldProps) => {
  return (
    <div>
      <label htmlFor="">{field.label}</label>
      <InputTextarea
        name={field.id as string}
        defaultValue={field.results?.[0]?.response?.value}
      />
    </div>
  );
};

export default TextAreaField;
