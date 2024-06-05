import { Card } from "primereact/card";
import { FormGroup } from "../../../models/form-scheme";
import { Divider } from "primereact/divider";
import FieldList from "./FieldList";
import "../styles/styles.css";
import DepentFields from "./DepentFields";

interface FormGroupListProps {
  formGroups: FormGroup[] | undefined;
}

const FormGroupList = ({ formGroups }: FormGroupListProps) => {
  return (
    <div className="form-group-list">
      {formGroups?.map((formGroup) => {
        if (formGroup.fields[0].metadata.type === "boolean") {
          console.log("is boolean", formGroup.fields[0].id);
          return <DepentFields formGroup={formGroup} />;
        }
        return (
          <Card key={formGroup.id} className="p-card">
            <div className="p-card-title">{formGroup.label}</div>
            <Divider className="p-divider" />
            <FieldList fields={formGroup.fields} />
          </Card>
        );
      })}
    </div>
  );
};

export default FormGroupList;
