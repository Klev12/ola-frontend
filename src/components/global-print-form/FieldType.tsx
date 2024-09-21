import { InputText } from "primereact/inputtext";
import { Field, FieldIdentifier } from "../../models/form-scheme";
import SelectType from "./SelectType";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalFormContext } from "./GlobalPrintForm";
import { Calendar } from "primereact/calendar";
import CheckBoxType from "./CheckBoxType";
import { InputTextarea } from "primereact/inputtextarea";

interface FieldTypeProps {
  field: Field;
  required?: boolean;
}

const FieldType = ({ field, required }: FieldTypeProps) => {
  const { editionMode, setFormDetails, formDetails } =
    useContext(GlobalFormContext);

  const defaultValue = useMemo(() => {
    return field?.results?.[0]?.response?.value;
  }, [field]);

  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      {field.component === "input" && field?.metadata?.type !== "date" && (
        <InputText
          value={value}
          required={required || field.required}
          name={field.id as string}
          disabled={!editionMode}
          onChange={(e) => {
            const text = e.target.value.toUpperCase();
            setValue(text);
            switch (field.identifier) {
              case FieldIdentifier.cardId:
                setFormDetails({ ...formDetails, cardId: text });
                break;
              case FieldIdentifier.names:
                setFormDetails({ ...formDetails, userNames: text });
                break;
              case FieldIdentifier.lastNames:
                setFormDetails({ ...formDetails, userLastNames: text });
                break;
              case FieldIdentifier.data:
                break;
            }
          }}
        />
      )}

      {field.component === "input" && field?.metadata?.type === "date" && (
        <Calendar
          value={new Date(defaultValue || "2024")}
          required={required || field.required}
          disabled={!editionMode}
          name={field.id as string}
        />
      )}

      {field.component === "chip" && (
        <InputText
          defaultValue={defaultValue}
          required={required || field.required}
          name={field.id as string}
          disabled={!editionMode}
        />
      )}
      {field.component === "check" && (
        <CheckBoxType defaultValue={defaultValue} field={field} />
      )}
      {field.component === "select" && (
        <SelectType defaultValue={defaultValue} field={field} />
      )}
      {field.component === "textarea" && (
        <InputTextarea
          style={{ height: "100px", margin: 0 }}
          defaultValue={defaultValue}
          required={required || field.required}
          name={field.id as string}
          disabled={!editionMode}
        />
      )}
    </>
  );
};

export default FieldType;
