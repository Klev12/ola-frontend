import { useMutation, useQuery } from "react-query";
import { getFormById, getUserFormByUserId } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";
import { findUserById } from "../../services/user-service";
import { ENV } from "../../consts/const";
import { MultimediaType } from "../../models/user";
import "./styles/check-user-form-styles.css";
import { useRef, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";

interface CheckUserFormProps {
  normalMode?: boolean;
}

const CheckUserForm = ({ normalMode = false }: CheckUserFormProps) => {
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: findUserByIdMutate, data: userData } =
    useMutation(findUserById);

  const { data: formData, isLoading: isFormLoading } = useQuery({
    queryFn: () =>
      normalMode
        ? getFormById(id as string).then((res) => res.data)
        : getUserFormByUserId(id as string).then((res) => res.data),
    queryKey: ["form-user", id],
    retry: 1,
    onSuccess: (data) => {
      if (!normalMode) findUserByIdMutate(data.user_form.user_id);
    },
    onError: () => {
      setErrorMessage("Formulario no encontrado");
    },
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

  return (
    <div className="user-form" style={{ position: "relative" }}>
      <Toast ref={toast} />
      {isFormLoading && <ProgressSpinner />}
      {errorMessage && <h2>{errorMessage}</h2>}
      <GlobalPrintForm
        showHeader={true}
        formInfo={formData?.user_form}
        formScheme={formData?.form_scheme}
        defaulEditionMode={false}
        onSubmit={(results) => {
          submitFormMutate({ id: formData?.user_form?.id as number, results });
        }}
        loading={isLoading}
      />

      <div className="images">
        {userData?.data.user.multimedias.map((file) => {
          if (file.type === MultimediaType.video) {
            return (
              <video
                key={file.id}
                src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
                width={300}
                controls={true}
              ></video>
            );
          }

          return (
            <img
              key={file.id}
              src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
              alt={file.name}
              width={200}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckUserForm;
