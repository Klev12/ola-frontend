import { InputText } from "primereact/inputtext";
import { Field } from "../../../models/form-scheme";
import { GlobalFormContext } from "../GlobalPrintForm";
import { useContext, useEffect, useMemo, useState } from "react";

interface FieldStringNumberProps {
  field: Field;
  required?: boolean;
}

const FieldStringNumber = ({ field, required }: FieldStringNumberProps) => {
  const { editionMode } = useContext(GlobalFormContext);

  const defaultValue = useMemo(() => {
    return field?.results?.[0]?.response?.value;
  }, [field]);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <InputText
      inputMode="numeric"
      value={value}
      name={`${field.id}`}
      required={required || field.required}
      disabled={!editionMode}
      onChange={(e) => {
        const regex = /^\d*$/g;

        if (
          regex.test(e.target.value) &&
          e.target.value.length <= (field.metadata.max || 10)
        ) {
          setValue(e.target.value);
        } else {
          setValue(e.target.value.match(/\d/g)?.join("").slice(0, 10) || "");
        }
      }}
    />
  );
};

export default FieldStringNumber;
