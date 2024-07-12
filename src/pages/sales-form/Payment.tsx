import { useContext } from "react";
import { SalesFormContext } from "./components/WrapperSalesForm";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

const Payment = () => {
  const { errorMessage, isFormLoading } = useContext(SalesFormContext);

  if (isFormLoading) {
    return (
      <div>
        <ProgressSpinner />
        Cargando formulario...
      </div>
    );
  }

  return (
    <div>
      Payment
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <span className="p-float-label p-input-icon-right">
          <InputMask id="cardNumber" mask="9999 9999 9999 9999" />
          <i className="pi pi-credit-card"></i>
          <label htmlFor="cardNumber">Número de la tarjeta</label>
        </span>

        <span className="p-float-label p-input-icon-right">
          <InputMask mask="99/99" />
          <i className="pi pi-calendar"></i>
          <label htmlFor="CVV">Fecha de expiración</label>
        </span>

        <span className="p-float-label p-input-icon-right">
          <InputMask mask="999" />
          <i className="pi pi-lock"></i>
          <label htmlFor="CVV">CVV</label>
        </span>

        <span className="p-float-label">
          <InputText />
          <label htmlFor="Postal Code">Código Postal</label>
        </span>

        <Button label="Aceptar" />
      </div>
    </div>
  );
};

export default Payment;
