import { FloatLabel } from "primereact/floatlabel";
import { Field } from "../../../models/form-scheme";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";

interface FieldProps {
  field: Field;
}

const FieldInput = ({ field }: FieldProps) => {
  const [selectedOption, setSelectedOption] = useState(
    field.metadata?.options?.[0]
  );

  const [options] = useState(() => {
    return field.metadata?.options?.map((option) => {
      return {
        name: option.label,
        code: option.value,
      };
    });
  });

  return (
    <div>
      {field.component === "input" && (
        <FloatLabel>
          {field.metadata.type === "number" && (
            <>
              <InputNumber id={`I${field.label}`} />
              <label htmlFor={`I${field.label}`}>{field.label}</label>
            </>
          )}
          {field.metadata.type === "text" && (
            <>
              <InputText id={`I${field.label}`} />
              <label htmlFor={`I${field.label}`}>{field.label}</label>
            </>
          )}
        </FloatLabel>
      )}
      {field.component === "select" && (
        <>
          <Dropdown
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
    </div>
  );
};

export default FieldInput;
