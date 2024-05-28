import { Field } from "../../../models/form-scheme";
import FieldInput from "./FieldInput";
import "../styles.css";

interface FieldListProps {
  fields: Field[];
}

const FieldList = ({ fields }: FieldListProps) => {
  return (
    <div className="field-list">
      {fields.map((field) => {
        return (
          <div key={field.id} className="field-list-items">
            <div className="field-list-input">
              <FieldInput field={field} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FieldList;
