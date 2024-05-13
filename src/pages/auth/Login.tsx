import { InputText } from "primereact/inputtext";
import "./styles/login-styles.css";
import { Button } from "primereact/button";
import { FormEventHandler } from "react";
import { Password } from "primereact/password";
import ROUTES from "../../consts/routes";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../services/auth-service";
import { LoginDto } from "../../models/auth";

const Login = () => {
  const navigate = useNavigate();

  const { mutate: mutateLogin } = useMutation(login, {
    onSuccess: async (req) => {
      console.log(req.data);
      navigate(ROUTES.HOME.ME);
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
    <div>
      <h2>Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Correo electrónico:</label>
        <InputText
          style={{ marginTop: "-5%" }}
          id="email"
          placeholder="Correo electrónico"
          name="email"
          required
        />
        <label htmlFor="password">Contraseña: </label>
        <Password
          style={{ marginTop: "-5%" }}
          toggleMask
          name="password"
          placeholder="contraseña"
          required
        />
        <Button label="Iniciar sesión"></Button>
        <p style={{ marginTop: "-5%" }}>¿No tienes Cuenta?</p>
        <div
          rel="noopener noreferrer"
          className="p-button font-bold"
          style={{
            marginTop: "-7%",
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={ROUTES.SIGNUP}>Crear Cuenta</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
