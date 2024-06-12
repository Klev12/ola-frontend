import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useMutation, useQuery } from "react-query";
import { verifyUser } from "../../services/auth-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { sendVerifyUserNotification } from "../../services/notification-service";
import useGlobalState from "../../store/store";
import { useRef, useState } from "react";

const Verification = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const userFormId = useGlobalState((state) => state.userFormId);

  useQuery({
    queryFn: verifyUser,
    onError: () => {
      navigate(ROUTES.USER_FORM.ME);
    },
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
    <div>
      <Toast ref={toast} />
      <p>
        El administrador debe revisar los datos del formulario, espera un
        momento...
      </p>
      <Button
        label="Enviar Formulario"
        loading={isLoading}
        disabled={buttonDisabled || isLoading}
        onClick={() => {
          sendVerifyUserNotificationMutate(userFormId as number);
          setButtonDisabled(true);
        }}
      />
    </div>
  );
};

export default Verification;
