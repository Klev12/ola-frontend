import { Checkbox } from "primereact/checkbox";
import { Field } from "../../models/form-scheme";
import { useContext, useEffect, useState } from "react";
import { GlobalFormContext } from "./GlobalPrintForm";

interface CheckBoxTypeProps {
  field?: Field;
  defaultValue?: string;
}

const CheckBoxType = ({ field, defaultValue }: CheckBoxTypeProps) => {
  const { editionMode } = useContext(GlobalFormContext);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(defaultValue === "on");
  }, [defaultValue]);

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        required={field?.required}
        name={field?.id as string}
        disabled={!editionMode}
      />
    </>
  );
};

export default CheckBoxType;
