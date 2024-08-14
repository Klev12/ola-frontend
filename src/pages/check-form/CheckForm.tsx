import { useMutation, useQuery } from "react-query";
import { getFormById } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";
import { ENV } from "../../consts/const";
import PaymentDataForm from "../sales/components/PaymentDataForm";
import useGlobalState from "../../store/store";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const CheckForm = () => {
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const { data: formData } = useQuery({
    queryFn: () => getFormById(id as string).then((res) => res.data),
    queryKey: ["form-user", id],
    retry: 1,
  });

  const { mutate: submitFormMutate, isLoading } = useMutation(submitForm, {
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        summary: "Éxito al subir cambios",
      });
    },
    onError: (error) => {
      const message = (error as any)?.response?.data?.error?.message;

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    },
  });
  const isFormEditable = useGlobalState((state) => state.isFormEditable);

  return (
    <div className="user-form">
      <Toast ref={toast} />
      <PrintForm
        normalMode={true}
        form={formData}
        isLoading={isLoading}
        onSubmit={(data) => {
          console.log(data);
          submitFormMutate(data);
        }}
        refetchUser={() => {}}
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
        <div>
          <PaymentDataForm
            payment={formData?.form?.payment}
            formId={formData?.form?.id as number}
            disabled={isFormEditable}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckForm;
