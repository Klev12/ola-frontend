import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef } from "react";

import { Password } from "primereact/password";
import { useMutation } from "react-query";
import authService from "../../services/auth-service";
import { AxiosError } from "axios";

const ChangeOwnPassword = () => {
  const toast = useRef<Toast>(null);

  const { mutate: changePasswordAuth, isLoading } = useMutation(
    ({ newPassword, password }: { password: string; newPassword: string }) =>
      authService.changePasswordAuth({ newPassword, password }),
    {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: "Contraseña cambiada exitosamente",
        });
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

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eef2f7",
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

            changePasswordAuth({
              password: formData["password"].toString(),
              newPassword: formData["newPassword"].toString(),
            });
          }}
        >
          <h2>Cambiar contraseña</h2>
          <label>Coloca tu contraseña actual:</label>
          <Password
            disabled={isLoading}
            toggleMask
            placeholder="Contraseña actual"
            required
            name="password"
          />

          <label>Nueva contraseña:</label>
          <Password
            disabled={isLoading}
            toggleMask
            placeholder="Nueva contraseña"
            required
            name="newPassword"
          />
          <Button label="Continuar" disabled={isLoading} loading={isLoading} />
        </form>
      </Card>
    </div>
  );
};

export default ChangeOwnPassword;
