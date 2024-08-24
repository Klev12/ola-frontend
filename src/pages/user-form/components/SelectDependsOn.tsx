import { Dropdown } from "primereact/dropdown";
import { Field } from "../../../models/form-scheme";
import { useEffect, useState } from "react";
import useToggle from "../../../hooks/useToggle";
import checkArrayContent from "../../../utils/check-array-content";
import FieldInput from "./FieldInput";
import useGlobalState from "../../../store/store";

interface SelectDependsOnProps {
  field: Field;
  dependencies: Field[];
}

const SelectDependsOn = ({ field, dependencies }: SelectDependsOnProps) => {
  const isFormEditable = useGlobalState((state) => state.isFormEditable);

  const [selectedOption, setSelectedOption] = useState(
    field.results[0]?.response?.value
  );

  const showDependencies = useToggle();
  const [currentDependencies, setCurrentDependencies] = useState<Field[]>([]);

  useEffect(() => {
    if (currentDependencies.length > 0) {
      showDependencies.setTrue();
    } else {
      showDependencies.setFalse();
    }
  }, [currentDependencies, showDependencies]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "20px",
          maxWidth: "300px",
        }}
      >
        <label htmlFor="">{field.label}</label>
        {field.required && <small>campo obligatorio*</small>}
        <Dropdown
          value={selectedOption}
          options={field?.metadata?.options?.map((option) => {
            return { value: option.value, label: option.label };
          })}
          onChange={(e) => {
            setSelectedOption(e.value);
            setCurrentDependencies(() => {
              return dependencies.filter((depend) => {
                return checkArrayContent(depend.metadata?.dependsOn || [], [
                  e.value,
                ]);
              });
            });
          }}
          name={field?.id as string}
          disabled={isFormEditable}
        ></Dropdown>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "20px",
          maxWidth: "300px",
          marginLeft: "20px",
        }}
      >
        {showDependencies.value && (
          <>
            {dependencies.map((field) => {
              return <FieldInput field={field} required={true} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SelectDependsOn;
