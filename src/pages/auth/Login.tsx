import { InputText } from "primereact/inputtext";
import "./styles/login-styles.css";
import { Button } from "primereact/button";
import { FormEventHandler, useState } from "react";
import { Password } from "primereact/password";
import ROUTES from "../../consts/routes";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../services/auth-service";
import { LoginDto, CustomError } from "../../models/auth"; // Importa las interfaces
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate: mutateLogin } = useMutation(login, {
    onSuccess: async (req) => {
      console.log(req.data);
      navigate(ROUTES.HOME.ME);
    },
    onError: (error: AxiosError<CustomError>) => {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Cuenta no encontrada, Regístrate");
      } else {
        console.error("Su cuenta o su contraseña es incorrecta:", error);
        setErrorMessage(
          "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde."
        );
      }
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    mutateLogin({
      email: formData["email"],
      password: formData["password"],
    } as LoginDto);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Correo electrónico:</label>
          <InputText
            id="email"
            placeholder="Correo electrónico"
            name="email"
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <Password
            name="password"
            placeholder="Contraseña"
            required
            toggleMask
          />
          <Button label="Iniciar sesión" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Link to={ROUTES.RECOVER_ACCOUNT}>¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="signup-link">
            <Link to={ROUTES.SIGNUP}>Crear Nueva Cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
