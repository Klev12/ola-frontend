import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useMutation, useQuery } from "react-query";
import { authenticate, verifyUser } from "../../services/auth-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { sendVerifyUserNotification } from "../../services/notification-service";
import { useContext, useRef, useState } from "react";
import { UserFormContext } from "./WrapperUserForm";

const Verification = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { formInfo } = useContext(UserFormContext);

  useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    refetchInterval: 4000,
    onSuccess: (data) => {
      const isFormVerified = data.user.is_form_verified;
      if (isFormVerified) {
        navigate(ROUTES.HOME.ME);
      }
    },
    onError: () => {
      navigate(ROUTES.LOGIN);
    },
    queryKey: ["authenticated-user"],
  });

  useQuery({
    queryFn: verifyUser,
    onError: () => {
      navigate(ROUTES.LOGIN);
    },
    queryKey: ["verify-user"],
  });

  const { mutate: sendVerifyUserNotificationMutate, isLoading } = useMutation(
    sendVerifyUserNotification,
    {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "El formulario ha sido enviado exitosamente",
          life: 3000,
        });
        setButtonDisabled(true);
      },
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Hubo un error al enviar el formulario",
          life: 3000,
        });
        setButtonDisabled(true);
      },
    }
  );

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Toast ref={toast} />
      <Button
        style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
        label="Enviar Formulario"
        loading={isLoading}
        disabled={buttonDisabled || isLoading}
        onClick={() => {
          sendVerifyUserNotificationMutate(formInfo?.id as number);
          setButtonDisabled(true);
        }}
      />
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40vw",
        }}
      >
        Haz click en enviar el formulario, tu cuenta será aceptada por
        administración.
      </p>
    </div>
  );
};

export default Verification;
