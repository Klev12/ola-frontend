import { PaymentGetDto } from "../../../models/payment";
import { useContext, useRef, useState } from "react";

import { SalesFormContext } from "./WrapperSalesForm";
import { Toast } from "primereact/toast";
import PaymentDataForm from "../../sales/components/PaymentDataForm";

interface PaymentOptionsProps {
  payment?: PaymentGetDto;
  formId?: number;
}

const PaymentOptions = ({}: PaymentOptionsProps) => {
  const { form, hashMode } = useContext(SalesFormContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <PaymentDataForm
        payment={form?.form?.payment}
        disabled={form?.form?.block || hashMode}
        formId={form?.form?.id as number}
      />
    </div>
  );
};

export default PaymentOptions;
