import { Card } from "primereact/card";
import { FormGroup } from "../../../models/form-scheme";
import { Divider } from "primereact/divider";
import FieldList from "./FieldList";

interface FormGroupListProps {
  formGroups: FormGroup[] | undefined;
}

const FormGroupList = ({ formGroups }: FormGroupListProps) => {
  return (
    <div>
      {formGroups?.map((formGroup) => {
        return (
          <Card key={formGroup.id}>
            {formGroup.label}
            <Divider />
            <FieldList fields={formGroup.fields} />
          </Card>
        );
      })}
    </div>
  );
};

export default FormGroupList;
