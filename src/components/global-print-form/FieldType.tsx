import { InputText } from "primereact/inputtext";
import { Field, FieldIdentifier } from "../../models/form-scheme";
import { Checkbox } from "primereact/checkbox";
import SelectType from "./SelectType";
import { useContext, useMemo } from "react";
import { GlobalFormContext } from "./GlobalPrintForm";
import { Calendar } from "primereact/calendar";

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

  return (
    <>
      {field.component === "input" && field?.metadata?.type !== "date" && (
        <InputText
          defaultValue={defaultValue}
          required={required || field.required}
          name={field.id as string}
          disabled={!editionMode}
          onChange={(e) => {
            const text = e.target.value;

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
          value={new Date(defaultValue)}
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
        <Checkbox
          checked={defaultValue === "on"}
          required={required || field.required}
          name={field.id as string}
          disabled={!editionMode}
        />
      )}
      {field.component === "select" && (
        <SelectType defaultValue={defaultValue} field={field} />
      )}
    </>
  );
};

export default FieldType;
