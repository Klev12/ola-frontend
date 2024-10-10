import { useContext, useEffect, useMemo, useState } from "react";
import { SalesFormContext } from "./components/WrapperSalesForm";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import SelectContractType from "./components/SelectContractType";
import FileUploader from "../../components/FileUploader";
import { ContractIds, ENV } from "../../consts/const";
import { FileDocument, FileType } from "../../models/file";
import { Button } from "primereact/button";
import Timer from "../../components/Timer";
import formatDate from "../../utils/format-date";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import SelectCourse from "./components/SelectCourse";
import { FormHashAccess } from "../../models/forms";

const SalesForm = () => {
  const {
    formInfo,
    formScheme,
    submit,
    setFormDetails,
    hash,
    hashMode,
    refetchForm,
    submitByHash,
    isFormExpire,
  } = useContext(SalesFormContext);

  const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);

  useEffect(() => {
    setIsSignatureUploaded(!!formInfo?.signature);
  }, [formInfo]);

  const cardImages = useMemo(() => {
    return (
      formInfo?.files
        ?.filter((file) => file.type === FileType.cardId)
        .map((file) => {
          return {
            id: file.id,
            identifier: file.hash,
            status: "completado",
            url: `${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`,
          } as FileDocument;
        }) || []
    );
  }, [formInfo]);

  const photos = useMemo(() => {
    return (
      formInfo?.files
        ?.filter((file) => file.type === FileType.photo)
        .map((file) => {
          return {
            id: file.id,
            identifier: file.hash,
            status: "completado",
            url: `${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`,
          } as FileDocument;
        }) || []
    );
  }, [formInfo]);

  const defaulEditionMode = useMemo(() => {
    if (formInfo?.done) {
      return false;
    } else if (
      hashMode &&
      [FormHashAccess.readOnly, FormHashAccess.onlySignature].includes(
        formInfo?.hashAccess as FormHashAccess
      )
    ) {
      return false;
    }
    return true;
  }, [formInfo, hashMode]);

  return (
    <div>
      {isFormExpire && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Formulario expirado, por favor usa otro link</h2>
        </div>
      )}
      {!isFormExpire && (
        <GlobalPrintForm
          defaulEditionMode={defaulEditionMode}
          type="sales-form"
          customHeaderTemplate={({ pdfButton, goBackButton }) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginRight: "20px",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Formulario: {formInfo?.code}
                </span>
                <span>Creador en: {formatDate(formInfo?.createdAt || "")}</span>
              </div>
              {!hashMode && (
                <>
                  {goBackButton}
                  <Button
                    label="Subir cambios"
                    disabled={!isSignatureUploaded || formInfo?.done}
                  />
                  {pdfButton}
                </>
              )}
              {hashMode && (
                <>
                  {formInfo?.expire_hash_time && (
                    <Timer
                      expiryTimestamp={new Date(formInfo.expire_hash_time)}
                      onExpireFn={() => {
                        window.location.reload();
                      }}
                    />
                  )}
                  <Button label="Siguiente" disabled={!isSignatureUploaded} />
                </>
              )}
            </>
          )}
          showSubmitButton={false}
          showHeader={true}
          formInfo={formInfo}
          formScheme={formScheme}
          onSubmit={(data) => {
            confirmDialog({
              header: "Confirmación",
              acceptLabel: "Sí",
              message: "¿Desea subir los cambios?",
              accept: () => {
                if (!hashMode) {
                  submit({ id: formInfo?.id as number, results: data });
                } else {
                  submitByHash({
                    id: formInfo?.id as number,
                    results: data,
                    hash,
                  });
                }
              },
            });
            // if (!hashMode) {
            //   submit({ id: formInfo?.id as number, results: data });
            // } else {
            //   submitByHash({ id: formInfo?.id as number, results: data, hash });
            // }
          }}
          formFooter={
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <div style={{ margin: "50px 0" }}>
                {formInfo?.contract_id === ContractIds.projectHub && (
                  <SelectCourse />
                )}
              </div>
              <SelectContractType formId={formInfo?.id as number} />
            </div>
          }
          onChangeDetails={(form) => {
            setFormDetails(form);
          }}
        />
      )}

      {!isFormExpire && (
        <div style={{ padding: "40px" }}>
          <h2>Firma</h2>
          <FileUploader
            disabled={formInfo?.done}
            additionalPayload={{ formId: formInfo?.id }}
            defaultFiles={[
              {
                id: 1,
                identifier: formInfo?.signature as string,
                status: "completado",
                url: `${ENV.BACKEND_ROUTE}/multimedia/${formInfo?.signature}`,
              },
            ]}
            deleteUrl=""
            uploadUrl={`${ENV.BACKEND_ROUTE}/forms/signature/${
              hashMode ? hash : ""
            }`}
            onAfterUpload={() => {
              if (!hashMode) {
                refetchForm();
              }
              setIsSignatureUploaded(true);
            }}
            name="signature"
            showGeneralDelete={false}
            maxFiles={1}
            type="canvas-draw"
            showSpecificDelete={false}
          />
          <h2>Imágenes de cédula</h2>
          <FileUploader
            disabled={formInfo?.done}
            noIdentifier={true}
            additionalPayload={{
              type: FileType.cardId,
              formId: formInfo?.id,
            }}
            deletePayload={{ formId: formInfo?.id, type: FileType.cardId }}
            inARow={true}
            accept=".jpeg, .png"
            defaultFiles={cardImages}
            deleteUrl={`${ENV.BACKEND_ROUTE}/files/${hashMode ? hash : ""}`}
            maxFiles={2}
            type="image"
            showSpecificDelete={false}
            name="file"
            uploadUrl={`${ENV.BACKEND_ROUTE}/files/${hashMode ? hash : ""}`}
            onAfterUpload={() => {
              if (!hashMode) {
                refetchForm();
              }
            }}
          />
          <h2>Foto del cliente</h2>
          <FileUploader
            disabled={formInfo?.done}
            noIdentifier={true}
            defaultFiles={photos}
            additionalPayload={{ type: FileType.photo, formId: formInfo?.id }}
            uploadUrl={`${ENV.BACKEND_ROUTE}/files/${hashMode ? hash : ""}`}
            deletePayload={{ formId: formInfo?.id, type: FileType.photo }}
            deleteUrl={`${ENV.BACKEND_ROUTE}/files/${hashMode ? hash : ""}`}
            maxFiles={1}
            accept=".jpeg, .png"
            type="camara"
            showSpecificDelete={false}
            name="file"
            onAfterUpload={() => {
              if (!hashMode) {
                refetchForm();
              }
            }}
          />
        </div>
      )}
      <ConfirmDialog draggable={false} />
    </div>
  );
};

export default SalesForm;
