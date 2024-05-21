import React, { FormEventHandler, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { Dropdown } from "primereact/dropdown";
import { useMutation } from "react-query";
import { signup } from "../../services/auth-service";
import { SignupDto } from "../../models/auth";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import "./styles/signup-styles.css";

const Signup: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    value: string;
  }>({
    name: "admin",
    value: "admin",
  });

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: mutateSignup } = useMutation(signup, {
    onSuccess: () => {
      setIsPending(true);
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error desconocido, por favor intente de nuevo.");
      }
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    console.log(formData);
    mutateSignup({
      email: formData["email"] as string,
      fullname: formData["fullname"] as string,
      area: formData["area"] as string,
      password: formData["password"] as string,
    } as SignupDto);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <Dialog
          header={
            <>
              <i
                style={{ marginRight: "100px" }}
                className="pi pi-spinner pi-spin"
              ></i>
              Pendiente de aceptación
            </>
          }
          visible={isPending}
          modal
          onHide={() => setIsPending(false)}
          closable={false}
          dismissableMask={false}
        >
          <p>Tu cuenta está pendiente de aceptación por un administrador.</p>
        </Dialog>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Registro</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <label htmlFor="email">Correo electrónico: </label>
          <InputText
            id="email"
            placeholder="Correo electrónico"
            name="email"
            required
          />
          <label htmlFor="fullname">Nombre completo: </label>
          <InputText
            id="fullname"
            placeholder="Nombre completo"
            name="fullname"
            required
          />

          <label htmlFor="area">Área: </label>
          <Dropdown
            id="area"
            value={selectedArea}
            name="area"
            options={[
              { value: "admin", name: "admin" },
              { value: "secretary", name: "secretary" },
            ]}
            onChange={(e) => setSelectedArea(e.value)}
            optionLabel="name"
            placeholder="Selecciona una área"
            className="w-full md:w-14rem"
          />

          <label htmlFor="password">Contraseña: </label>
          <Password
            toggleMask
            name="password"
            placeholder="Contraseña"
            required
          />
          <label htmlFor="confirm-password">Confirmar contraseña: </label>
          <Password
            toggleMask
            name="confirm-password"
            placeholder="Repite tu contraseña"
            required
          />

          <Button label="Registrarse"></Button>

          <div className="login-link">
            <Link to={ROUTES.LOGIN}>¿Ya tienes cuenta?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
