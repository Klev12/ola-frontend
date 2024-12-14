import { useMutation, useQuery } from "react-query";
import { getFormById } from "../../services/forms-service";

import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";
import { ContractIds, ENV } from "../../consts/const";

import { Toast } from "primereact/toast";
import { useMemo, useRef } from "react";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import FileUploader from "../../components/FileUploader";
import { FileDocument, FileType } from "../../models/file";
import { AxiosError } from "axios";
import saleService from "../../services/sale-service";
import ServiceOrCourseData from "./components/ServiceOrCourseData";
import { Card } from "primereact/card";
import TransactionListData from "./components/TransactionListData";

const CheckForm = () => {
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const { data: formData, refetch: refetchForm } = useQuery({
    queryFn: () => getFormById(id as string).then((res) => res.data),
    queryKey: ["form-sales-data", id],
    retry: 1,
  });

  const { data: saleData } = useQuery({
    queryFn: () =>
      saleService.findById({ formId: Number(id) }).then((res) => res.data),
    queryKey: ["sale-data", id],
    retry: 1,
  });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        summary: "Éxito al subir cambios",
      });
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      const message = error?.response?.data?.error?.message;

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    },
  });

  const cardImages = useMemo(() => {
    return (
      formData?.form?.files
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
  }, [formData]);

  return (
    <Card className="user-form">
      <Toast ref={toast} />
      <GlobalPrintForm
        defaulEditionMode={false}
        type={
          formData?.form?.contract_id === ContractIds.projectHub
            ? "hub-form"
            : "sales-form"
        }
        showHeader={true}
        formInfo={formData?.form}
        formScheme={formData?.form_scheme}
        showSubmitButton={false}
        onSubmit={(results) => {
          submitFormMutate({ id: formData?.form?.id as number, results });
        }}
      />
      <div style={{ padding: "30px" }}>
        <ServiceOrCourseData form={saleData?.form} />
        <TransactionListData form={formData?.form} />
        <h2>Firma</h2>
        <FileUploader
          additionalPayload={{ formId: formData?.form?.id }}
          defaultFiles={[
            {
              id: 1,
              identifier: formData?.form?.signature as string,
              status: "completado",
              url: `${ENV.BACKEND_ROUTE}/multimedia/${formData?.form?.signature}`,
            },
          ]}
          deleteUrl=""
          uploadUrl={`${ENV.BACKEND_ROUTE}/forms/signature`}
          onAfterUpload={() => {
            refetchForm();
          }}
          name="signature"
          showGeneralDelete={false}
          maxFiles={1}
          type="canvas-draw"
          showSpecificDelete={false}
        />
        <h2>Fotos de identificación</h2>
        <FileUploader
          noIdentifier={true}
          additionalPayload={{
            type: FileType.cardId,
            formId: formData?.form?.id,
          }}
          deletePayload={{ formId: formData?.form?.id, type: FileType.cardId }}
          inARow={true}
          accept=".jpeg, .png"
          defaultFiles={cardImages}
          deleteUrl={`${ENV.BACKEND_ROUTE}/files/`}
          maxFiles={2}
          type="image"
          showSpecificDelete={false}
          name="file"
          uploadUrl={`${ENV.BACKEND_ROUTE}/files/`}
          onAfterUpload={() => {
            refetchForm();
          }}
        />
        <div className="images">
          {formData?.form?.files?.map((file) => {
            return (
              <img
                width={200}
                src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
              ></img>
            );
          })}
          <img
            width={200}
            src={`${ENV.BACKEND_ROUTE}/multimedia/${formData?.form?.signature}`}
          ></img>
        </div>
      </div>
    </Card>
  );
};

export default CheckForm;
