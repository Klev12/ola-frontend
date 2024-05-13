import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { FormEventHandler, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useMutation } from "react-query";
import { signup } from "../../services/auth-service";
import { SignupDto } from "../../models/auth";

const Signup = () => {
  const { mutate: mutateSignup } = useMutation(signup);

  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    value: string;
  }>({ name: "admin", value: "admin" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    console.log(formData);
    mutateSignup({
      email: formData["email"],
      fullname: formData["fullname"],
      area: formData["area"],
      password: formData["password"],
    } as SignupDto);
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <label htmlFor="email">Correo electrónico: </label>
        <InputText
          style={{ marginTop: "-5%" }}
          id="email"
          placeholder="Correo electrónico"
          name="email"
          required
        />
        <label htmlFor="fullname">Nombre completo: </label>
        <InputText
          style={{ marginTop: "-5%" }}
          id="fullname"
          placeholder="Nombre completo"
          name="fullname"
          required
        />

        <label htmlFor="area">Area: </label>
        <Dropdown
          id="area"
          style={{ width: "100%", marginTop: "-5%" }}
          value={selectedArea}
          name="area"
          options={[
            { value: "admin", name: "admin" },
            { value: "dos", name: "secretary" },
          ]}
          onChange={(e) => setSelectedArea(e.value)}
          optionLabel="name"
          placeholder="Selecciona una área"
          className="w-full md:w-14rem"
        />

        <label htmlFor="password">Contraseña: </label>
        <Password
          style={{ marginTop: "-5%" }}
          toggleMask
          name="password"
          placeholder="contraseña"
          required
        />
        <label htmlFor="password">Confirm password: </label>
        <Password
          style={{ marginTop: "-5%" }}
          toggleMask
          name="confirm-password"
          placeholder="Repite tu contraseña"
          required
        />

        <Button label="Registrarse"></Button>

        <div
          rel="noopener noreferrer"
          className="p-button font-bold"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={ROUTES.LOGIN}>¿Ya tienes cuenta?</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
