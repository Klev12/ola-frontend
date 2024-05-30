import { Dropdown } from "primereact/dropdown";
import { Field, OptionMetadata } from "../../../models/form-scheme";
import { useState } from "react";

interface SelectFieldProps {
  field: Field;
}

const SelectField = ({ field }: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<OptionMetadata>({
    label: field.results?.[0]?.response?.value as string,
    value: field.metadata.options?.[0].value as string,
  });
  console.log(selectedValue);
  return (
    <>
      <label>{field.label}</label>
      <Dropdown
        required={field.required}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.value)}
        defaultValue={field.results?.[0]?.response?.value || ""}
        options={field.metadata.options}
        optionLabel="label"
        placeholder={field.label}
        name={field.id as string}
      />
    </>
  );
};

export default SelectField;
