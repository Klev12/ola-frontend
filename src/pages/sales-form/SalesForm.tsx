import { useContext, useMemo } from "react";
import { SalesFormContext } from "./components/WrapperSalesForm";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import SelectContractType from "./components/SelectContractType";
import FileUploader from "../../components/FileUploader";
import { ENV } from "../../consts/const";
import { FileDocument, FileType } from "../../models/file";
import TermsAndConditionsSales from "./components/TermsAndConditionsSales";
import { Button } from "primereact/button";

const SalesForm = () => {
  const {
    formInfo,
    formScheme,
    submit,
    setFormDetails,
    hash,
    hashMode,
    refetchForm,
  } = useContext(SalesFormContext);

  const isSignatureUploaded = useMemo(() => {
    return !!formInfo?.signature;
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

  return (
    <div>
      <GlobalPrintForm
        type="sales-form"
        customHeaderTemplate={({ pdfButton, goBackButton }) => (
          <>
            {goBackButton}
            <Button label="Siguiente" disabled={!isSignatureUploaded} />
            {pdfButton}
          </>
        )}
        showSubmitButton={false}
        showHeader={true}
        formInfo={formInfo}
        formScheme={formScheme}
        onSubmit={(data) => {
          submit({ id: formInfo?.id as number, results: data });
        }}
        formFooter={
          <>
            <SelectContractType formId={formInfo?.id as number} />
            <TermsAndConditionsSales />
          </>
        }
        onChangeDetails={(form) => {
          setFormDetails(form);
        }}
      />
      <div style={{ padding: "40px" }}>
        <h2>Firma</h2>
        <FileUploader
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
          }}
          name="signature"
          showGeneralDelete={false}
          maxFiles={1}
          type="canvas-draw"
          showSpecificDelete={false}
        />
        <h2>Imágenes de cédula</h2>
        <FileUploader
          noIdentifier={true}
          additionalPayload={{ type: FileType.cardId, formId: formInfo?.id }}
          deletePayload={{ formId: formInfo?.id, type: FileType.cardId }}
          inARow={true}
          accept=".jpeg, .png"
          defaultFiles={cardImages}
          deleteUrl={`${ENV.BACKEND_ROUTE}/files`}
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
          noIdentifier={true}
          defaultFiles={photos}
          additionalPayload={{ type: FileType.photo, formId: formInfo?.id }}
          uploadUrl={`${ENV.BACKEND_ROUTE}/files/${hashMode ? hash : ""}`}
          deletePayload={{ formId: formInfo?.id, type: FileType.photo }}
          deleteUrl={`${ENV.BACKEND_ROUTE}/files`}
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
    </div>
  );
};

export default SalesForm;
