import { InputNumber } from "primereact/inputnumber";
import { PaymentGetDto } from "../../../models/payment";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import {
  createPayment,
  updatePayment,
} from "../../../services/payment-service";
import { Toast } from "primereact/toast";

interface PaymentDataFormProps {
  payment?: PaymentGetDto;
  formId?: number;
  onSuccess?: () => void;
  disabled?: boolean;
}

const PaymentDataForm = ({
  payment,
  onSuccess,
  formId,
  disabled = false,
}: PaymentDataFormProps) => {
  const toast = useRef<Toast>(null);

  const [isPaymentPresent, setIsPaymentPresent] = useState(!!payment);

  const [total, setTotal] = useState(parseFloat(String(payment?.total)) || 0);
  const [suscriptionValue, setSubscriptionValue] = useState(
    parseFloat(String(payment?.subscription_value)) || 0
  );
  const [remainingTotal, setRemainingTotal] = useState(
    parseFloat(String(payment?.remaining_total)) || 0
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
  const [paymentResponse, setPaymentResponse] = useState<
    PaymentGetDto | undefined
  >(undefined);

  useEffect(() => {
    setIsPaymentPresent(!!payment);
    setTotal(parseFloat(String(payment?.total)) || 0);
    setSubscriptionValue(parseFloat(String(payment?.subscription_value)) || 0);
    setNumberFees(parseFloat(String(payment?.number_fees)) || 0);
    setMonthValue(parseFloat(String(payment?.month_value)) || 0);
  }, [payment]);

  useEffect(() => {
    if (total < suscriptionValue) setSubscriptionValue(total);
    if (suscriptionValue >= total) setSubscriptionValue(total);
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
    onSuccess: (response) => {
      setIsPaymentPresent(true);
      setPaymentResponse(response.data.payment);
      toast.current?.show({
        severity: "success",
        detail: "Datos de pago agregados",
      });
      if (onSuccess) onSuccess();
    },
    onError: (data) => {
      const message = (data as any)?.response?.data?.error?.message;
      toast.current?.show({
        severity: "error",
        detail: message,
      });
    },
  });

  const { mutate: updatePaymentMutate } = useMutation(updatePayment, {
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        detail: "Datos de pago actualizados",
      });
      if (onSuccess) onSuccess();
    },
    onError: (data) => {
      const message = (data as any)?.response?.data?.error?.message;
      toast.current?.show({
        severity: "error",
        detail: message,
      });
    },
  });

  return (
    <>
      <Toast ref={toast} />
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
              paymentId:
                (payment?.id as number) || (paymentResponse?.id as number),
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
          disabled={disabled}
        />
        <label>valor a pagar</label>
        <InputNumber
          value={suscriptionValue}
          mode="decimal"
          minFractionDigits={2}
          name="suscription"
          required
          onChange={(value) => {
            setSubscriptionValue(value.value || 0);
          }}
          min={0}
          disabled={disabled}
        />
        <label htmlFor="">número de cuotas</label>
        <Dropdown
          name="numberFees"
          value={numberFees}
          options={options}
          onChange={(value) => {
            setNumberFees(value.value || 1);
          }}
          disabled={total === suscriptionValue || disabled}
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
        {!isPaymentPresent && <Button disabled={disabled} label="Aceptar" />}
        {isPaymentPresent && (
          <Button disabled={disabled} label="actualizar datos" />
        )}
      </form>
    </>
  );
};

export default PaymentDataForm;
