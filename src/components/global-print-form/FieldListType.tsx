import { useMemo } from "react";
import { Field } from "../../models/form-scheme";
import FieldType from "./FieldType";
import checkArrayContent from "../../utils/check-array-content";
import SelectDependsOnType from "./SelectDependsOnType";

interface FieldListTypeProps {
  fields: Field[];
}

const FieldListType = ({ fields }: FieldListTypeProps) => {
  const dependsOnFields = useMemo(() => {
    return fields.filter((field) => !!field.metadata.dependsOn);
  }, [fields]);

  return (
    <>
      {fields.map((field) => {
        if (field.component === "select") {
          const dependencies = dependsOnFields.filter((depen) => {
            return checkArrayContent(
              field.metadata.options?.map((option) => option.value) || [],
              depen.metadata.dependsOn || []
            );
          });

          if (dependencies.length > 0) {
            return (
              <SelectDependsOnType
                key={field.id}
                field={field}
                dependencies={dependencies}
              />
            );
          }
        }

        if (field.metadata.dependsOn) {
          return;
        }

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
            <label htmlFor="" className="">
              {field.label}:{" "}
            </label>
            <small>{field.required && "campo obligatorio*"}</small>
            <FieldType field={field} />
          </div>
        );
      })}
    </>
  );
};

export default FieldListType;
