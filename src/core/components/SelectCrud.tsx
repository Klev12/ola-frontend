import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export interface Option {
  value: string;
  label?: string;
}

interface SelectCrudProps<T> {
  options: Option[];
  defaultValue?: T;
  name?: string;
  required?: boolean;
}

export default function SelectCrud<T>({
  options,
  defaultValue,
  name,
  required,
}: SelectCrudProps<T>) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <Dropdown
        required={required}
        name={name}
        value={value}
        options={options}
        onChange={(e) => {
          setValue(e.value);
        }}
      />
    </>
  );
}
