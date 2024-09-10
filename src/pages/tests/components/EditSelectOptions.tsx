import { useEffect, useState } from "react";
import { Field, OptionMetadata } from "../../../models/form-scheme";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import useDebounce from "../../../hooks/useDebounce";
import { useMutation } from "react-query";
import fieldService from "../../../services/field-service";

interface EditSelectOptionsProps {
  field: Field;
  disabled?: boolean;
}

const EditSelectOptions = ({ field, disabled }: EditSelectOptionsProps) => {
  const [options, setOptions] = useState<OptionMetadata[]>();

  const { mutate: patchField } = useMutation(fieldService.patch);

  useEffect(() => {
    setOptions(field.metadata.options);
  }, [field]);

  const { debounce: changeTextDebounce } = useDebounce({
    fn: (text: string) => {
      patchField({ label: text, fieldId: field.id as number });
    },
    time: 1000,
  });

  const { debounce: changeMetadataDebounce } = useDebounce({
    fn: (currentOptions?: OptionMetadata[]) => {
      if (!currentOptions) {
        return;
      }

      patchField({
        fieldId: field.id as number,
        metadata: { ...field.metadata, options: currentOptions },
      });
    },
    time: 1000,
  });

  return (
    <div>
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <InputText
          style={{ width: "100%" }}
          defaultValue={field.label}
          onChange={(e) => {
            changeTextDebounce(e.target.value || "");
          }}
          disabled={disabled}
        />
      </div>
      <div style={{ marginLeft: "20px" }}>
        <div>
          {options?.map((option, index) => {
            return (
              <div
                key={index}
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <InputText
                  disabled={disabled}
                  style={{ width: "50%" }}
                  defaultValue={option.label}
                  onChange={(e) => {
                    const text = e.target.value;
                    setOptions(() => {
                      const newOptions = [...options];

                      newOptions[index].label = text;
                      changeMetadataDebounce(newOptions);
                      return newOptions;
                    });
                  }}
                />
                <Checkbox
                  disabled={disabled}
                  checked={option.correct == "true"}
                  onClick={() => {
                    setOptions(() => {
                      const newOptions = [...options];
                      newOptions.forEach((option) => {
                        option.correct = "false";
                      });
                      newOptions[index].correct = "true";
                      changeMetadataDebounce(newOptions);
                      return newOptions;
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditSelectOptions;
