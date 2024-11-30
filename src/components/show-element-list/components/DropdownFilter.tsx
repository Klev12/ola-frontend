import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

interface DropdownFilterProps {
  placeholder?: string;
  options?: object[];
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
}

const DropdownFilter = ({
  placeholder,
  options,
  onChange,
  defaultValue,
}: DropdownFilterProps) => {
  const [value, setValue] = useState<string | number>(defaultValue || 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <Dropdown
        value={value}
        placeholder={placeholder}
        options={options}
        onChange={(option) => {
          setValue(option.value);
          if (onChange) onChange(option.value);
        }}
      />
    </div>
  );
};

export default DropdownFilter;
