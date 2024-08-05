import { InputNumber } from "primereact/inputnumber";
import { PaymentGetDto } from "../../../models/payment";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import {
  createPayment,
  updatePayment,
} from "../../../services/payment-service";

interface PaymentDataFormProps {
  payment?: PaymentGetDto;
  formId?: number;
  onSuccess?: () => void;
}

const PaymentDataForm = ({
  payment,
  onSuccess,
  formId,
}: PaymentDataFormProps) => {
  const [isPaymentPresent] = useState(!!payment);

  const [total, setTotal] = useState(payment?.total || 0);
  const [suscriptionValue, setSubscriptionValue] = useState(
    parseFloat(payment?.subscription_value.toString() as string) || 0
  );
  const [remainingTotal, setRemainingTotal] = useState(
    parseFloat(payment?.remaining_total.toString() as string) || 0
  );
  const [numberFees, setNumberFees] = useState(
    Number(payment?.number_fees) || 1
  );
  const options = useMemo(
    () =>
      [...Array(9).keys()].map((i) => ({ value: i + 1, label: `${i + 1}` })),
    []
  );
  const [monthValue, setMonthValue] = useState(payment?.month_value || 0);

  useEffect(() => {
    if (total < suscriptionValue) setSubscriptionValue(total);
  }, [total, suscriptionValue]);

  useEffect(() => {
    if (total === suscriptionValue) {
      setNumberFees(1);
    }
  }, [total, suscriptionValue]);

  useEffect(() => {
    setRemainingTotal(total - suscriptionValue);
  }, [suscriptionValue]);

  useEffect(() => {
    if (remainingTotal === 0) {
      setMonthValue(0);
      return;
    }

    setMonthValue(remainingTotal / numberFees);
  }, [numberFees, suscriptionValue, remainingTotal]);

  const { mutate: createPaymentMutate } = useMutation(createPayment, {
    onSuccess,
  });

  const { mutate: updatePaymentMutate } = useMutation(updatePayment, {
    onSuccess,
  });

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(
          new FormData(e.target as HTMLFormElement)
        );

        const total = parseFloat(formData["total"].toString());
        const suscription = parseFloat(formData["suscription"].toString());
        const numberFees = Number(formData["numberFees"]);

        if (isPaymentPresent) {
          updatePaymentMutate({
            total,
            suscription,
            numberFees,
            paymentId: payment?.id as number,
          });

          return;
        }
        createPaymentMutate({
          total,
          suscription,
          numberFees,
          formId: formId as number,
        });
      }}
    >
      <label>total</label>
      <InputNumber
        value={total}
        mode="decimal"
        minFractionDigits={2}
        name="total"
        required
        onChange={(value) => {
          setTotal(value.value || 0);
        }}
        min={0}
      />
      <label>valor a pagar</label>
      <InputNumber
        value={suscriptionValue}
        mode="decimal"
        minFractionDigits={2}
        name="suscription"
        required
        onChange={(value) => {
          if ((value.value || 0) > total) {
            setSubscriptionValue(total);
            return;
          }
          setSubscriptionValue(value.value || 0);
        }}
        min={0}
      />
      <label htmlFor="">número de cuotas</label>
      <Dropdown
        name="numberFees"
        value={numberFees}
        options={options}
        onChange={(value) => {
          setNumberFees(value.value || 1);
        }}
        disabled={total === suscriptionValue}
      />
      <label htmlFor="">valor mensual</label>
      <InputNumber
        value={monthValue}
        mode="decimal"
        minFractionDigits={2}
        disabled
      />
      <label htmlFor="">valor restante</label>
      <InputNumber
        value={remainingTotal}
        minFractionDigits={2}
        mode="decimal"
        disabled
      />
      {!isPaymentPresent && <Button label="Aceptar" />}
      {isPaymentPresent && <Button label="actualizar datos" />}
    </form>
  );
};

export default PaymentDataForm;
