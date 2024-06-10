import { Button } from "primereact/button";
import { useMutation, useQuery } from "react-query";
import { verifyUser } from "../../services/auth-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { sendVerifyUserNotification } from "../../services/notification-service";
import useGlobalState from "../../store/store";

const Verification = () => {
  const navigate = useNavigate();

  const userFormId = useGlobalState((state) => state.userFormId);

  useQuery({
    queryFn: verifyUser,
    onError: () => {
      navigate(ROUTES.USER_FORM.ME);
    },
  });

  const { mutate: sendVerifyUserNotificationMutate, isLoading } = useMutation(
    sendVerifyUserNotification
  );

  return (
    <div>
      <p>
        El administrador debe revisar los datos del formulario, espera un
        momento...
      </p>
      <Button
        label="Enviar notificación"
        loading={isLoading}
        onClick={() => {
          sendVerifyUserNotificationMutate(userFormId as number);
        }}
      ></Button>
    </div>
  );
};

export default Verification;
