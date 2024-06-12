import { Field, OptionMetadata } from "../../../models/form-scheme";
import { useState } from "react";
import useGlobalState from "../../../store/store";

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

  const isFormEditable = useGlobalState((state) => state.isFormEditable);

  return (
    <>
      <label>{field.label}</label>
      {field.required && <small>campo obligatorio*</small>}
      <select
        disabled={isFormEditable}
        required={field.required}
        name={field.id as string}
        value={selectedValue.value}
        onChange={(e) => {
          setSelectedValue({ label: "", value: e.target.value });
        }}
      >
        {field.metadata.options?.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectField;
