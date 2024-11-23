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
import SelectService from "./components/SelectService";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";

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
          type={
            formInfo?.contract_id === ContractIds.projectHub
              ? "hub-form"
              : "sales-form"
          }
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
          }}
          formFooter={
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <div style={{ margin: "50px 0" }}>
                {formInfo?.contract_id === ContractIds.projectHub && (
                  <SelectCourse />
                )}
                {formInfo?.contract_id === ContractIds.ola && <SelectService />}
              </div>
              <SelectContractType formId={formInfo?.id as number} />
              {formInfo && !isFormExpire && (
                <div>
                  {hashMode ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
                  {formInfo?.signature && (
                    <img
                      about="signature"
                      width={200}
                      src={`${ENV.BACKEND_ROUTE}/multimedia/${formInfo.signature}`}
                    ></img>
                  )}
                  <h2>Imágenes de cédula (opcional)</h2>
                  <FileUploader
                    disabled={formInfo?.done}
                    noIdentifier={true}
                    additionalPayload={{
                      type: FileType.cardId,
                      formId: formInfo?.id,
                    }}
                    deletePayload={{
                      formId: formInfo?.id,
                      type: FileType.cardId,
                    }}
                    inARow={true}
                    accept=".jpeg, .png"
                    defaultFiles={cardImages}
                    deleteUrl={`${ENV.BACKEND_ROUTE}/files/${
                      hashMode ? hash : ""
                    }`}
                    maxFiles={2}
                    type="image"
                    showSpecificDelete={false}
                    name="file"
                    uploadUrl={`${ENV.BACKEND_ROUTE}/files/${
                      hashMode ? hash : ""
                    }`}
                    onAfterUpload={() => {
                      if (!hashMode) {
                        refetchForm();
                      }
                    }}
                  />
                  <h2>Foto del cliente (opcional)</h2>
                  <FileUploader
                    disabled={formInfo?.done}
                    noIdentifier={true}
                    defaultFiles={photos}
                    additionalPayload={{
                      type: FileType.photo,
                      formId: formInfo?.id,
                    }}
                    uploadUrl={`${ENV.BACKEND_ROUTE}/files/${
                      hashMode ? hash : ""
                    }`}
                    deletePayload={{
                      formId: formInfo?.id,
                      type: FileType.photo,
                    }}
                    deleteUrl={`${ENV.BACKEND_ROUTE}/files/${
                      hashMode ? hash : ""
                    }`}
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
              <Divider color="black"></Divider>
              <Card title="Finalizar*">
                {!hashMode && (
                  <Button
                    style={{ marginTop: "20px" }}
                    label="Subir cambios"
                    disabled={formInfo?.done}
                  />
                )}
                {hashMode && (
                  <Button label="Siguiente" disabled={!isSignatureUploaded} />
                )}
              </Card>
            </div>
          }
          onChangeDetails={(form) => {
            setFormDetails(form);
          }}
        />
      )}

      <ConfirmDialog draggable={false} />
    </div>
  );
};

export default SalesForm;
