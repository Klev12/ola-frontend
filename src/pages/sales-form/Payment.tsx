import { Card } from "primereact/card";
import PaymentOptions from "./components/PaymentOptions";
import PayphonePay from "./components/PayphonePay";

const Payment = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 100,
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <PaymentOptions />
      <PayphonePay />
    </div>
  );
};

export default Payment;
