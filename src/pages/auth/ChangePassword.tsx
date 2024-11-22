import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ROUTES from "../../consts/routes";
import { useMutation } from "react-query";
import authService from "../../services/auth-service";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";

const ChangePassword = () => {
  const { token } = useParams();
  const showDialog = useToggle();
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const { mutate: changePassword } = useMutation(
    ({ password, token }: { token: string; password: string }) =>
      authService.changePassword({ password, token }),
    {
      onSuccess: () => {
        showDialog.setTrue();
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data.error?.message,
        });
      },
    }
  );

  useEffect(() => {
    if (repeatPassword !== password) {
      setError("Las contraseñas son diferentes");
    } else {
      setError(null);
    }
  }, [password, repeatPassword]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Toast ref={toast} />
      <Card style={{ width: "80%", maxWidth: "310px", padding: "20px" }}>
        <form
          action=""
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );
            changePassword({
              password: formData["password"].toString(),
              token: token as string,
            });
          }}
        >
          <h2>Cambiar contraseña</h2>
          <label>Coloca tu nueva contraseña:</label>
          <Password
            placeholder="Contraseña"
            required
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
          />

          <label>Repite tu contraseña:</label>
          <small style={{ color: "red" }}>{error}</small>
          <Password
            placeholder="Repite la contraseña"
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
            toggleMask
          />
          <Button label="Cambiar contraseña" disabled={!!error} />
          <Button
            outlined
            type="button"
            label="Volver a pantalla de inicio de sesión"
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
          />
        </form>
      </Card>

      <Dialog
        style={{ width: "80%", maxWidth: "310px", padding: "20px" }}
        header="Link enviado"
        closable={false}
        visible={showDialog.value}
        onHide={() => showDialog.setFalse()}
      >
        <p>Tu contraseña ha sido cambiada con éxito</p>
        <Button
          label="Ir a home"
          onClick={() => {
            navigate(ROUTES.HOME.ME);
          }}
        />
      </Dialog>
    </div>
  );
};

export default ChangePassword;
