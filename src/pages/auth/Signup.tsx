import React, { FormEventHandler, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { Dropdown } from "primereact/dropdown";
import { useMutation } from "react-query";
import { signup, signupCollaborator } from "../../services/auth-service";
import { SignupCollaboratorDto, SignupDto } from "../../models/auth";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import "./styles/signup-styles.css";
import { UserArea } from "../../models/user";

const Signup: React.FC = () => {
  const { code } = useParams();

  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    value: string;
  }>({
    name: "admin",
    value: "admin",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const { mutate: mutateSignup } = useMutation(signup, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error desconocido, por favor intente de nuevo.");
      }
    },
  });

  const { mutate: signupCollaboratorMutate } = useMutation(signupCollaborator, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error desconocido, por favor intente de nuevo.");
      }
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setVisible(true);
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    const password = formData["password"] as string;
    const confirmPassword = formData["confirm-password"] as string;

    if (password !== confirmPassword) {
      setErrorMessage("La contraseña no coincide");
      setVisible(false);
      return;
    }

    try {
      if (code) {
        signupCollaboratorMutate({
          email: formData["email"] as string,
          fullname: formData["fullname"] as string,
          area: formData["area"] as string,
          password: formData["password"] as string,
          code,
        } as SignupCollaboratorDto);
        return;
      }

      await mutateSignup({
        email: formData["email"] as string,
        fullname: formData["fullname"] as string,
        area: formData["area"] as string,
        password: formData["password"] as string,
      } as SignupDto);
    } catch (error) {
      setVisible(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Registro {code && `colaborador de ${code}`}</h2>
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
            options={Object.values(UserArea).map((area) => {
              switch (area) {
                case UserArea.commercial:
                  return {
                    value: area,
                    label: "Asesor comercial",
                  };
                case UserArea.communityManager:
                  return {
                    value: area,
                    label: "Community manager",
                  };
                case UserArea.communication:
                  return {
                    value: area,
                    label: "Comunicación",
                  };
                case UserArea.design:
                  return {
                    value: area,
                    label: "Diseño",
                  };
                case UserArea.marketing:
                  return {
                    value: area,
                    label: "Marketing",
                  };
                case UserArea.photograph:
                  return {
                    value: area,
                    label: "Fotografía",
                  };
                case UserArea.secretary:
                  return {
                    value: area,
                    label: "Secretario/a",
                  };
                case UserArea.telemarketing:
                  return {
                    value: area,
                    label: "Telemarketing",
                  };
              }
            })}
            onChange={(e) => setSelectedArea(e.value)}
            optionLabel="label"
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
        <Dialog
          draggable={false}
          header="Resgitrado"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <p className="m-0">
            Espera un momento por favor, tu cuenta debe ser aceptada por un
            administrador.
          </p>
        </Dialog>
      </div>
    </div>
  );
};

export default Signup;
