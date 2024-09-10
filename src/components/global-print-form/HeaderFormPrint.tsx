import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { ReactNode, useContext, useRef } from "react";
import { GlobalFormContext } from "./GlobalPrintForm";
import ROUTES from "../../consts/routes";
import { PrimeIcons } from "primereact/api";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";
import GoBackButton from "../GoBackButton";

export interface CustomHeaderTemplateProps {
  editionMenu: ReactNode;
  verificationButton: ReactNode;
  submitButton: ReactNode;
  pdfButton: ReactNode;
  goBackButton: ReactNode;
}

interface HeaderFormPrintProps {
  customHeaderTemplate?: (options: CustomHeaderTemplateProps) => ReactNode;
}

const HeaderFormPrint = ({ customHeaderTemplate }: HeaderFormPrintProps) => {
  const { editionMode, setEditionMode, formInfo, type, loading } =
    useContext(GlobalFormContext);

  const toast = useRef<Toast>(null);

  const { mutate: verifyFormMutate, isLoading: verifyingForm } = useMutation(
    verifyForm,
    {
      onSuccess: () => {},
      onError: (
        data: AxiosError<{ error: { message: string; errorCode: string } }>
      ) => {
        const errorCode = data.response?.data?.error?.errorCode;
        if (errorCode === "2005") {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail:
              "Aún se necesita llenar más campos del formulario para verificarlo",
          });
        }
      },
    }
  );

  const headerOptions: CustomHeaderTemplateProps = {
    goBackButton: <GoBackButton />,
    editionMenu: (
      <div style={{ display: "flex", gap: "10px" }}>
        <label style={{ fontSize: "14px" }}>
          Modo edición {editionMode ? "activado" : "desactivado"}
        </label>
        <Checkbox
          checked={!!editionMode}
          onChange={() => {
            setEditionMode(!editionMode);
          }}
        />
      </div>
    ),
    verificationButton: (
      <Button
        outlined
        type="button"
        style={{ fontSize: "14px" }}
        disabled={!editionMode || verifyingForm || loading}
        label={
          formInfo?.done ? "Formulario verificado" : "Verificar formulario"
        }
        onClick={() => {
          verifyFormMutate(formInfo?.id as number);
        }}
      />
    ),
    submitButton: (
      <Button
        disabled={!editionMode || loading}
        loading={loading}
        label="Subir"
        style={{ fontSize: "14px" }}
      />
    ),
    pdfButton: (
      <a
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
        target="_blank"
        href={
          type === "user-form"
            ? ROUTES.PDF.USER_ID(formInfo?.user_id as number)
            : ROUTES.PDF.PDF_ID(formInfo?.id as number)
        }
      >
        <i className={PrimeIcons.EYE}></i>
        <span>pdf</span>
      </a>
    ),
  };

  return (
    <>
      <Toast ref={toast} />
      <nav
        style={{
          position: "fixed",
          width: "100%",
          padding: "30px",
          background: "white",
          zIndex: "10",
          display: "flex",
          justifyContent: "end",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {!customHeaderTemplate &&
            Object.values(headerOptions).map((headerOption, index) => {
              return <div key={index}>{headerOption}</div>;
            })}
          {customHeaderTemplate && customHeaderTemplate(headerOptions)}
        </div>
      </nav>
    </>
  );
};

export default HeaderFormPrint;
