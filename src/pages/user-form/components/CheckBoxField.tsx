import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { Field } from "../../../models/form-scheme";

interface CheckBoxFieldProps {
  field: Field;
}

const CheckBoxField = ({ field }: CheckBoxFieldProps) => {
  const [checked, setChecked] = useState(
    () => field.results?.[0]?.response?.value === "on"
  );
  console.log(checked);
  return (
    <>
      <label htmlFor="">{field.label}</label>
      <Checkbox
        required={field.required}
        value={checked}
        defaultValue={field.results?.[0]?.response?.value}
        name={field.id as string}
        onChange={(e) => setChecked(e.checked as boolean)}
        checked={checked}
      ></Checkbox>
    </>
  );
};

export default CheckBoxField;
