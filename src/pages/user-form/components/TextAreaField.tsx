import { InputTextarea } from "primereact/inputtextarea";
import { Field } from "../../../models/form-scheme";
import useGlobalState from "../../../store/store";

interface TextAreaFieldProps {
  field: Field;
}

const TextAreaField = ({ field }: TextAreaFieldProps) => {
  const isFormEditable = useGlobalState((state) => state.isFormEditable);

  return (
    <div>
      <label htmlFor="">{field.label}</label>
      <InputTextarea
        disabled={isFormEditable}
        name={field.id as string}
        defaultValue={field.results?.[0]?.response?.value}
      />
    </div>
  );
};

export default TextAreaField;
