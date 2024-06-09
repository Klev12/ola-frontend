import { Dropdown } from "primereact/dropdown";
import { Field, OptionMetadata } from "../../../models/form-scheme";
import { useState } from "react";

interface SelectFieldProps {
  field: Field;
}

const SelectField = ({ field }: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<OptionMetadata>(() => ({
    label: field.metadata.options?.filter(
      (option) => option.value == field.results?.[0]?.response?.value
    )?.[0]?.label as string,
    value: field.results?.[0]?.response?.value as string,
  }));

  console.log(selectedValue);

  return (
    <>
      <label>{field.label}</label>
      {field.required && <small>campo obligatorio*</small>}
      <Dropdown
        required={field.required}
        value={selectedValue}
        defaultValue={selectedValue.label}
        onChange={(e) => setSelectedValue(e.value)}
        options={field.metadata.options}
        optionLabel="label"
        placeholder={field.label}
        name={field.id as string}
      />
    </>
  );
};

export default SelectField;
