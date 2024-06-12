import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useState } from "react";
import { FormGroup } from "../../../models/form-scheme";
import { Dropdown } from "primereact/dropdown";
import FieldList from "./FieldList";
import useGlobalState from "../../../store/store";

interface DepentFieldsProps {
  formGroup: FormGroup;
}

const DepentFields = ({ formGroup }: DepentFieldsProps) => {
  const [showFields, setShowFields] = useState<string>(() => {
    return formGroup.fields[0].results?.[0]?.response.value || "true";
  });

  const isFormEditable = useGlobalState((state) => state.isFormEditable);

  return (
    <Card key={formGroup.id} className="p-card">
      <div className="p-card-title">{formGroup.label}</div>
      <Divider className="p-divider" />
      <div>
        <h3>{formGroup.fields[0].label}</h3>
        {formGroup.fields[0].required && <small>campo obligatorio*</small>}

        <Dropdown
          disabled={isFormEditable}
          defaultValue={formGroup.fields[0].results?.[0]?.response?.value}
          required={formGroup.fields[0].required}
          value={showFields}
          onChange={(e) => {
            setShowFields(e.value);
          }}
          options={formGroup.fields[0].metadata.options}
          optionLabel="label"
          placeholder={formGroup.fields[0].label}
          name={formGroup.fields[0].id as string}
        />
      </div>

      {showFields === "true" && (
        <FieldList
          fields={formGroup.fields.filter(
            (field) => field.id !== formGroup.fields[0].id
          )}
        />
      )}
    </Card>
  );
};

export default DepentFields;
