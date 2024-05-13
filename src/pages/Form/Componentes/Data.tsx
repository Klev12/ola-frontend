import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";

interface Props {
  onFormSubmit?: (data: FormDataType) => void;
}

interface FormDataType {
  fullname: string;
  phone: string;
  direction: string;
  email: string;
  ruc: string;
}

const DataPerson: React.FC<Props> = ({ onFormSubmit }) => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [direction, setDirection] = useState("");
  const [email, setEmail] = useState("");
  const [ruc, setRuc] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormDataType = { fullname, phone, direction, email, ruc };
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="card flex justify-content-center">
        <FloatLabel>
          <InputText
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="fullname">Nombre Completos</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="phone">Teléfono</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          />
          <label htmlFor="direction">Dirección</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Correo Electrónico</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="ruc"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
          />
          <label htmlFor="ruc">Número de Cédula</label>
        </FloatLabel>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default DataPerson;
