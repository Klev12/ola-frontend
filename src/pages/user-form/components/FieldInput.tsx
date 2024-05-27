import { FloatLabel } from "primereact/floatlabel";
import { Field } from "../../../models/form-scheme";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";

interface FieldProps {
  field: Field;
}

const FieldInput = ({ field }: FieldProps) => {
  const [selectedOption, setSelectedOption] = useState({
    name: field.results[0]?.response?.value,
    value: field.results[0]?.response?.value,
  });

  const [options] = useState(() => {
    return field.metadata?.options?.map((option) => {
      return {
        name: option.label,
        value: option.value,
      };
    });
  });

  const [chipValues, setChipValues] = useState<string[]>(() => {
    return [];
  });

  return (
    <div>
      {field.component === "input" && (
        <FloatLabel>
          {field.metadata.type === "number" && (
            <>
              {console.log(field.results[0]?.response?.value)}
              <InputNumber
                value={Number(
                  field.results[0]?.response?.value.replace(/\,/g, "")
                )}
                id={`I${field.label}`}
                name={field.id as string}
              />
              <label htmlFor={`I${field.label}`}>{field.label}</label>
            </>
          )}
          {field.metadata.type === "text" && (
            <>
              <InputText
                defaultValue={field.results[0]?.response?.value}
                id={`I${field.label}`}
                name={field.id as string}
              />
              <label htmlFor={`I${field.label}`}>{field.label}</label>
            </>
          )}
        </FloatLabel>
      )}
      {field.component === "select" && (
        <>
          <Dropdown
            name={field.id as string}
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.value);
            }}
            options={options}
            optionLabel="name"
            placeholder={field.label}
            className="w-full md:w-14rem"
          />
        </>
      )}
      {field.component === "check" && (
        <>
          <label htmlFor="" className="ml-2">
            {field.label}
          </label>
          <Checkbox checked={false}></Checkbox>
        </>
      )}
      {field.component === "chip" && (
        <>
          <Chips
            value={chipValues}
            onChange={(e) => {
              setChipValues(e.value as string[]);
            }}
          />
        </>
      )}
    </div>
  );
};

export default FieldInput;
