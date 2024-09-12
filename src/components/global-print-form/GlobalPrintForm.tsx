import { Button } from "primereact/button";
import { FormScheme } from "../../models/form-scheme";
import { FormDetails, FormGetDto } from "../../models/forms";
import formatDate from "../../utils/format-date";
import { ResultDto } from "../../models/result";
import DependentFormGroup from "./DependentFormGroup";
import FieldListType from "./FieldListType";
import HeaderFormPrint, { CustomHeaderTemplateProps } from "./HeaderFormPrint";
import { createContext, ReactNode, useEffect, useState } from "react";
import useFormDetails from "../../hooks/useFormDetails";

interface GlobalPrintFormProps {
  formScheme?: FormScheme;
  formInfo?: FormGetDto;
  onSubmit?: (data: ResultDto[]) => void;
  defaulEditionMode?: boolean;
  showHeader?: boolean;
  onChangeDetails?: (formDetails: FormDetails) => void;
  loading?: boolean;
  editMode?: boolean;
  customHeaderTemplate?: (options: CustomHeaderTemplateProps) => ReactNode;
  type?: "user-form" | "sales-form";
  formFooter?: ReactNode;
  footer?: ReactNode;
  showSubmitButton?: boolean;
}

interface GlobalFormContext {
  formScheme?: FormScheme;
  formInfo?: FormGetDto;
  formDetails?: FormDetails;
  setFormDetails: (formDetails: FormDetails) => void;
  editionMode?: boolean;
  setEditionMode: (mode: boolean) => void;
  type?: "user-form" | "sales-form";
  loading: boolean;
}

export const GlobalFormContext = createContext<GlobalFormContext>({
  editionMode: true,
  loading: false,
  setEditionMode: () => {},
  setFormDetails: () => {},
  type: "user-form",
});

const GlobalPrintForm = ({
  formScheme,
  formInfo,
  onSubmit,
  defaulEditionMode = true,
  showHeader,
  onChangeDetails,
  loading = false,
  editMode = false,
  customHeaderTemplate,
  type = "user-form",
  footer,
  formFooter,
  showSubmitButton = true,
}: GlobalPrintFormProps) => {
  const [editionMode, setEditionMode] = useState<boolean>(defaulEditionMode);
  const [formDetails, setFormDetails] = useState({});

  const currentFormDetails = useFormDetails({ formInfo, formScheme });

  useEffect(() => {
    setFormDetails(currentFormDetails);
  }, [currentFormDetails]);

  useEffect(() => {
    if (onChangeDetails) onChangeDetails(formDetails);
  }, [formDetails, onChangeDetails]);

  useEffect(() => {
    setEditionMode(editMode || defaulEditionMode);
  }, [editMode, defaulEditionMode]);

  return (
    <GlobalFormContext.Provider
      value={{
        loading,
        formScheme,
        formInfo,
        editionMode: editionMode,
        formDetails,
        setEditionMode: (mode) => {
          setEditionMode(mode);
        },
        setFormDetails: (form) => {
          setFormDetails(form);
        },
        type,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );

          const results: ResultDto[] = Object.entries(formData).map(
            ([key, value]) => {
              return {
                field_id: Number(key),
                response: {
                  value,
                },
              } as ResultDto;
            }
          );

          if (onSubmit) onSubmit(results);
        }}
      >
        {showHeader && (
          <HeaderFormPrint customHeaderTemplate={customHeaderTemplate} />
        )}
        <div style={{ padding: "30px", paddingTop: "100px" }}>
          <div>
            <h1>Formulario {formInfo?.code}</h1>
            <span>Creado en {formatDate(formInfo?.createdAt || "")}</span>
          </div>
          {formScheme?.form_groups.map((formGroup) => {
            const field = formGroup.fields?.[0];

            if (field?.metadata?.type === "boolean") {
              return (
                <div key={formGroup.id}>
                  <h2>{formGroup.label}</h2>
                  <DependentFormGroup formGroup={formGroup} />
                </div>
              );
            }

            return (
              <div key={formGroup.id}>
                <h2>{formGroup.label}</h2>
                <FieldListType fields={formGroup.fields} />
              </div>
            );
          })}
          {formFooter}
          {showSubmitButton && (
            <Button
              label="Subir cambios"
              loading={loading}
              disabled={loading || !editionMode}
            />
          )}
        </div>
      </form>
      {footer}
    </GlobalFormContext.Provider>
  );
};

export default GlobalPrintForm;
