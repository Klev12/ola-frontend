import { useContext } from "react";

import { SalesFormContext } from "./WrapperSalesForm";
import PaymentDataForm from "../../sales/components/PaymentDataForm";

const PaymentOptions = () => {
  const { formInfo, hashMode } = useContext(SalesFormContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <PaymentDataForm
        payment={formInfo?.payment}
        disabled={formInfo?.block || hashMode}
        formId={formInfo?.id as number}
      />
    </div>
  );
};

export default PaymentOptions;
