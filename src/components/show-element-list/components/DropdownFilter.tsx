import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

interface DropdownFilterProps {
  placeholder?: string;
  options?: object[];
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
  value?: number | string;
}

const DropdownFilter = ({
  placeholder,
  options,
  onChange,
  defaultValue,
  value: valueState,
}: DropdownFilterProps) => {
  const [value, setValue] = useState<string | number | undefined>(
    defaultValue || 0
  );

  useEffect(() => {
    setValue(valueState);
  }, [valueState]);

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
