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
      <select
        required={field.required}
        name={field.id as string}
        value={selectedValue.value}
        onChange={(e) => {
          setSelectedValue({ label: "", value: e.target.value });
        }}
      >
        {field.metadata.options?.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </>
  );
};

export default SelectField;
