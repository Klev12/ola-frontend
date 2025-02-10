import React, { FormEventHandler, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { Dropdown } from "primereact/dropdown";
import { useMutation, useQuery } from "react-query";
import { signup, signupCollaborator } from "../../services/auth-service";
import { SignupCollaboratorDto, SignupDto } from "../../models/auth";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import "./styles/signup-styles.css";
import { UserArea } from "../../models/user";
import collaboratorLinkService from "../../services/collaborator-link-service";
import { MemberLinkType } from "../../models/collaborator-link";

const Signup: React.FC = () => {
  const { code } = useParams();

  const navigate = useNavigate();

  const { data: collaboratorData, isLoading: isLoadingCollaboratorData } =
    useQuery({
      queryFn: () =>
        collaboratorLinkService
          .retrieveData(code as string)
          .then((res) => res.data),
      onError: () => {
        navigate(ROUTES.SIGNUP);
      },
      retry: 1,
      queryKey: ["collaborator-data", code],
    });

  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    value: string;
  }>({
    name: UserArea.administration,
    value: UserArea.administration,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const { mutate: mutateSignup, isLoading: isSigning } = useMutation(signup, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error desconocido, por favor intente de nuevo.");
      }
    },
    onSuccess: () => {
      setVisible(true);
    },
  });

  const { mutate: signupCollaboratorMutate, isLoading: isSigningCollaborator } =
    useMutation(signupCollaborator, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error desconocido, por favor intente de nuevo.");
        }
      },
      onSuccess: () => {
        setVisible(true);
      },
    });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

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
          area: UserArea.commercial,
          password: formData["password"] as string,
          token: code,
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
          <h2 className="subtitle">
            Registro{" "}
            {code &&
              !isLoadingCollaboratorData &&
              `${
                collaboratorData?.decodedToken.type ===
                MemberLinkType.collaborator
                  ? "colaborador"
                  : "socio"
              } de ${collaboratorData?.decodedToken.ownerCode} en el grupo "${
                collaboratorData?.decodedToken.teamName
              }"`}
          </h2>
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
            disabled={!!code}
            id="area"
            value={code ? UserArea.commercial : selectedArea}
            name="area"
            options={Object.values(UserArea).map((area) => {
              switch (area) {
                case UserArea.commercial:
                  return {
                    value: area,
                    label: "Comercial",
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
                case UserArea.administration:
                  return {
                    value: area,
                    label: "Adminitración",
                  };
                case UserArea.audiovisualProduction:
                  return {
                    value: area,
                    label: "Producción audiovisual",
                  };
              }
            })}
            onChange={(e) => {
              setSelectedArea(e.value);
            }}
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

          <Button
            label="Registrarse"
            disabled={isSigning || isSigningCollaborator}
            loading={isSigning || isSigningCollaborator}
          ></Button>

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
            navigate(ROUTES.LOGIN);
          }}
        >
          <p className="m-0">
            tu cuenta debe ser aceptada por un administrador o secretario, luego
            podrás iniciar sesión.
          </p>
        </Dialog>
      </div>
    </div>
  );
};

export default Signup;
