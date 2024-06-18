import { useMutation, useQuery } from "react-query";
import { getFormById, getUserFormByUserId } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";
import { findUserById } from "../../services/user-service";
import { ENV } from "../../consts/const";
import { MultimediaType } from "../../models/user";
import "./styles/check-user-form-styles.css";
import { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

interface CheckUserFormProps {
  normalMode?: boolean;
}

const CheckUserForm = ({ normalMode = false }: CheckUserFormProps) => {
  const { id } = useParams();

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

  const { mutate: submitFormMutate, isLoading } = useMutation(submitForm);

  return (
    <div className="user-form">
      {isFormLoading && <ProgressSpinner />}
      {errorMessage && <h2>{errorMessage}</h2>}
      <PrintForm
        normalMode={false}
        form={formData}
        isLoading={isLoading}
        user={userData?.data.user}
        onSubmit={(data) => {
          console.log(data);
          submitFormMutate(data);
        }}
        refetchUser={() => {
          findUserByIdMutate(userData?.data.user.id as number);
        }}
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
