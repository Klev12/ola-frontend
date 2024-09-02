import { Dropdown } from "primereact/dropdown";
import { Field } from "../../models/form-scheme";
import { useContext, useMemo, useState } from "react";
import { GlobalFormContext } from "./GlobalPrintForm";

interface SelectTypeProps {
  field: Field;
  defaultValue?: string;
}

const SelectType = ({ field, defaultValue }: SelectTypeProps) => {
  const { editionMode } = useContext(GlobalFormContext);

  const options = useMemo(() => {
    return field?.metadata?.options;
  }, [field]);

  const [selectedOption, setSelectedOption] = useState(
    defaultValue || options?.[0]?.value
  );

  return (
    <Dropdown
      value={selectedOption}
      options={options}
      onChange={(e) => {
        setSelectedOption(e.value);
      }}
      disabled={!editionMode}
      name={field.id as string}
    />
  );
};

export default SelectType;
