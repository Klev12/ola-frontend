import { useContext, useMemo, useState } from "react";
import { FormGroup } from "../../models/form-scheme";
import { Dropdown } from "primereact/dropdown";
import FieldType from "./FieldType";
import { GlobalFormContext } from "./GlobalPrintForm";

interface DependentFormGroupProps {
  formGroup: FormGroup;
}

const DependentFormGroup = ({ formGroup }: DependentFormGroupProps) => {
  const { editionMode } = useContext(GlobalFormContext);

  const firstField = useMemo(() => {
    return formGroup.fields?.[0];
  }, [formGroup]);

  const options = useMemo(() => {
    return firstField?.metadata?.options;
  }, [firstField]);

  const dependentFields = useMemo(() => {
    return formGroup.fields.slice(1, undefined);
  }, [formGroup]);

  const [selectedOption, setSelectedOption] = useState(
    firstField?.results?.[0]?.response?.value || options?.[0]?.value
  );

  return (
    <>
      <Dropdown
        style={{ marginBottom: "20px" }}
        value={selectedOption}
        options={options}
        onChange={(e) => {
          setSelectedOption(e.value);
        }}
        disabled={!editionMode}
        name={firstField.id as string}
      />
      {selectedOption === "true" && (
        <>
          {dependentFields.map((field) => {
            return (
              <div
                key={field.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <label>{field.label}: </label>
                <small>Campo obligatorio*</small>
                <FieldType field={field} required={true} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default DependentFormGroup;
