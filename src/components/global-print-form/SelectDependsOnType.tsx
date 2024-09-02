import { Dropdown } from "primereact/dropdown";
import { Field } from "../../models/form-scheme";
import { useContext, useMemo, useState } from "react";
import checkArrayContent from "../../utils/check-array-content";
import FieldType from "./FieldType";
import { GlobalFormContext } from "./GlobalPrintForm";

interface SelectDependsOnTypeProps {
  field: Field;
  dependencies: Field[];
}

const SelectDependsOnType = ({
  field,
  dependencies,
}: SelectDependsOnTypeProps) => {
  const { editionMode } = useContext(GlobalFormContext);

  const options = useMemo(() => {
    return field?.metadata?.options;
  }, [field]);

  const [selectedValue, setSelectedValue] = useState(
    field?.results?.[0]?.response?.value || options?.[0]?.value
  );

  const [currentDependencies, setCurrentDependencies] = useState<Field[]>(
    () => {
      return dependencies.filter((depend) => {
        return checkArrayContent(depend.metadata?.dependsOn || [], [
          selectedValue || "",
        ]);
      });
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <label htmlFor="">{field.label}: </label>
      <Dropdown
        value={selectedValue}
        options={options}
        disabled={!editionMode}
        onChange={(e) => {
          setSelectedValue(e.value);
          setCurrentDependencies(() => {
            return dependencies.filter((depend) => {
              return checkArrayContent(depend.metadata?.dependsOn || [], [
                e.value,
              ]);
            });
          });
        }}
        name={field.id as string}
      />
      <>
        {currentDependencies.length > 0 && (
          <div style={{ paddingLeft: "20px" }}>
            {currentDependencies.map((field) => {
              return (
                <div
                  key={field.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <label htmlFor="">{field.label}: </label>
                  <small>Campo obligatorio*</small>
                  <FieldType field={field} required={true} />
                </div>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default SelectDependsOnType;
