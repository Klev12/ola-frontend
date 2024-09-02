import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useContext, useRef } from "react";
import { GlobalFormContext } from "./GlobalPrintForm";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { PrimeIcons } from "primereact/api";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";

const HeaderFormPrint = () => {
  const { editionMode, setEditionMode, formInfo } =
    useContext(GlobalFormContext);

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const { mutate: verifyFormMutate, isLoading: verifyingForm } = useMutation(
    verifyForm,
    {
      onSuccess: () => {
        window.location.reload();
      },
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

  return (
    <>
      <Toast ref={toast} />
      <nav
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          padding: "30px",
          background: "white",
          zIndex: "10",
          display: "flex",
          justifyContent: "end",
          gap: "30px",
          alignItems: "center",
        }}
      >
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

        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            outlined
            type="button"
            style={{ fontSize: "14px" }}
            disabled={!editionMode || verifyingForm}
            label={
              formInfo?.done ? "Formulario verificado" : "Verificar formulario"
            }
            onClick={() => {
              verifyFormMutate(formInfo?.id as number);
            }}
          />
          <Button
            disabled={!editionMode}
            label="Subir"
            style={{ fontSize: "14px" }}
          />
          <Button
            icon={PrimeIcons.EYE}
            label="pdf"
            type="button"
            disabled={!formInfo?.done}
            style={{ fontSize: "14px" }}
            onClick={() => {
              navigate(ROUTES.PDF.PDF_ID(formInfo?.id as number));
            }}
          />
        </div>
      </nav>
    </>
  );
};

export default HeaderFormPrint;
