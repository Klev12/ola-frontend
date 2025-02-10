import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import GoBackButton from "../../components/GoBackButton";
import { useMutation } from "react-query";
import authService from "../../services/auth-service";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";

import { useNavigate } from "react-router";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import ROUTES from "../../consts/routes";

const RecoverAccount = () => {
  const toast = useRef<Toast>(null);
  const showDialog = useToggle();
  const navigate = useNavigate();

  const { mutate: requestNewPassword, isLoading } = useMutation(
    ({ email }: { email: string }) => authService.requestNewPassword({ email }),
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
            requestNewPassword({ email: formData["email"].toString() });
          }}
        >
          <GoBackButton />
          <h2 className="subtitle">Recupera tu cuenta</h2>
          <label>Coloca tu email:</label>
          <InputText
            placeholder="Email"
            required
            name="email"
            disabled={isLoading}
          />
          <Button label="Continuar" loading={isLoading} disabled={isLoading} />
        </form>
      </Card>
      <Dialog
        style={{ width: "80%", maxWidth: "310px", padding: "20px" }}
        header="Link enviado"
        closable={false}
        visible={showDialog.value}
        onHide={() => showDialog.setFalse()}
      >
        <p>
          Un link ha sido enviado a tu email. Abre el link y cambia tu
          contraseña
        </p>
        <Button
          label="Volver a página de inicio de sesión"
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
        />
      </Dialog>
    </div>
  );
};

export default RecoverAccount;
