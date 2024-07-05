import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const SelectTypeField = () => {
  const [option, setOption] = useState("input");

  return (
    <Dropdown
      value={option}
      options={[
        { label: "texto", value: "input" },
        { label: "selector", value: "select" },
      ]}
      onChange={(e) => {
        setOption(e.value);
      }}
      name="type"
    />
  );
};

export default SelectTypeField;
