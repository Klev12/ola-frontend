import { Field } from "../../../models/form-scheme";
import FieldInput from "./FieldInput";
import "../styles/styles.css";
import { useMemo } from "react";
import checkArrayContent from "../../../utils/check-array-content";
import SelectDependsOn from "./SelectDependsOn";

interface FieldListProps {
  fields: Field[];
}

const FieldList = ({ fields }: FieldListProps) => {
  const dependsOnFields = useMemo(() => {
    return fields.filter((field) => !!field.metadata.dependsOn);
  }, [fields]);

  // const selectDependencies = useMemo(() => {
  //   return selects.map((select) => {
  //     const dependencies = dependsOnFields.filter((depen) => {
  //       return checkArrayContent(
  //         select.metadata?.options?.map((option) => option.value) || [],
  //         depen.metadata.dependsOn || []
  //       );
  //     });
  //     return { select, dependencies };
  //   });
  // }, [selects, dependsOnFields]);
  return (
    <div className="field-list">
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
              <SelectDependsOn field={field} dependencies={dependencies} />
            );
          }
        }

        if (field.metadata.dependsOn) {
          return;
        }

        return (
          <div key={field.id} className="field-list-items">
            <div className="field-list-input">
              <FieldInput field={field} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FieldList;
