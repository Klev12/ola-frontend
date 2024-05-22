import { Field } from "../../../models/form-scheme";
import FieldInput from "./FieldInput";

interface FieldListProps {
  fields: Field[];
}

const FieldList = ({ fields }: FieldListProps) => {
  return (
    <div>
      {fields.map((field) => {
        return (
          <div key={field.id}>
            <FieldInput field={field} />
          </div>
        );
      })}
    </div>
  );
};

export default FieldList;
