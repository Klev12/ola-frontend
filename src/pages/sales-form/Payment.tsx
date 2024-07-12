import { useContext } from "react";
import { SalesFormContext } from "./components/WrapperSalesForm";
import { ProgressSpinner } from "primereact/progressspinner";

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
      <h2>{errorMessage}</h2>
    </div>
  );
};

export default Payment;
