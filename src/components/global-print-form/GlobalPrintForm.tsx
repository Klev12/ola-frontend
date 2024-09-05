import { Button } from "primereact/button";
import { FieldIdentifier, FormScheme } from "../../models/form-scheme";
import { FormDetails, FormGetDto } from "../../models/forms";
import formatDate from "../../utils/format-date";
import { ResultDto } from "../../models/result";
import DependentFormGroup from "./DependentFormGroup";
import FieldListType from "./FieldListType";
import HeaderFormPrint, { CustomHeaderTemplateProps } from "./HeaderFormPrint";
import { createContext, ReactNode, useEffect, useState } from "react";

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
}

interface GlobalFormContext {
  formScheme?: FormScheme;
  formInfo?: FormGetDto;
  formDetails?: FormDetails;
  setFormDetails: (formDetails: FormDetails) => void;
  editionMode?: boolean;
  setEditionMode: (mode: boolean) => void;
  type?: "user-form" | "sales-form";
}

export const GlobalFormContext = createContext<GlobalFormContext>({
  editionMode: true,
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
}: GlobalPrintFormProps) => {
  const [editionMode, setEditionMode] = useState<boolean>(defaulEditionMode);
  const [formDetails, setFormDetails] = useState(() => {
    const fields = formScheme?.form_groups
      .flatMap((formGroup) => formGroup.fields)
      .filter((field) => {
        const allowedFields = [
          FieldIdentifier.cardId,
          FieldIdentifier.lastNames,
          FieldIdentifier.names,
        ];
        return allowedFields.includes(field.identifier);
      })
      .map((field) => ({
        id: field.id,
        identifier: field.identifier,
        response: field.results?.[0]?.response?.value,
      }));

    return {
      cardId: fields?.find(
        (field) => field.identifier === FieldIdentifier.cardId
      )?.response,
      storeName: "",
      userLastNames: fields?.find(
        (field) => field.identifier === FieldIdentifier.lastNames
      )?.response,
      userNames: fields?.find(
        (field) => field.identifier === FieldIdentifier.names
      )?.response,
    } as FormDetails;
  });

  useEffect(() => {
    if (onChangeDetails) onChangeDetails(formDetails);
  }, [formDetails, onChangeDetails]);

  useEffect(() => {
    setEditionMode(editMode || defaulEditionMode);
  }, [editMode, defaulEditionMode]);

  return (
    <GlobalFormContext.Provider
      value={{
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
          <Button label="Subir cambios" loading={loading} disabled={loading} />
        </div>
      </form>
    </GlobalFormContext.Provider>
  );
};

export default GlobalPrintForm;
