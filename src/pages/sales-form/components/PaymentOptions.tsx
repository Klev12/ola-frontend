import { PaymentGetDto } from "../../../models/payment";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import {
  createPayment,
  updatePayment,
} from "../../../services/payment-service";
import { SalesFormContext } from "./WrapperSalesForm";
import { Toast } from "primereact/toast";

interface PaymentOptionsProps {
  payment?: PaymentGetDto;
  formId?: number;
}

const PaymentOptions = ({}: PaymentOptionsProps) => {
  const toast = useRef<Toast>(null);

  const { form, hashMode } = useContext(SalesFormContext);
  const [payment, setPayment] = useState(form?.form?.payment);

  useEffect(() => {
    console.log(form);
    setPayment(form?.form?.payment);
  }, [form]);

  const { mutate: createPaymentMutate } = useMutation(createPayment, {
    onSuccess: (response) => {
      setPayment(response.data.payment);
    },
    onError: (error) => {
      const message = (error as any)?.response?.data?.error?.message;
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    },
  });

  const { mutate: updatePaymentMutate } = useMutation(updatePayment, {
    onError: (error) => {
      const message = (error as any)?.response?.data?.error?.message;
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    },
  });

  const [total, setTotal] = useState<number | undefined>(payment?.total);
  const [subscriptionValue, setSubscriptionValue] = useState<
    number | undefined
  >(payment?.subscription_value);
  const [numberFees, setNumberFees] = useState(1);
  const [remainingTotal, setRemainingTotal] = useState(
    parseFloat(String(payment?.total))
  );
  const [monthValue, setMonthValue] = useState(remainingTotal);

  useEffect(() => {
    setRemainingTotal(() => {
      const value = (total || 0) - (subscriptionValue || 0);
      if (isNaN(value)) {
        return total || 0;
      }
      return value;
    });
  }, [subscriptionValue, total]);

  useEffect(() => {
    setMonthValue(() => {
      const currentValue =
        parseFloat(String(remainingTotal)) / parseFloat(String(numberFees));
      return currentValue;
    });
  }, [remainingTotal, numberFees]);

  useEffect(() => {
    setTotal(payment?.total);
    setSubscriptionValue(payment?.subscription_value);
    setRemainingTotal(payment?.remaining_total as number);
    setMonthValue(payment?.month_value as number);
    setNumberFees(payment?.number_fees as number);
  }, [payment]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Toast ref={toast} />

      <label htmlFor="">Total a pagar:</label>
      <InputNumber
        required
        disabled={form?.form?.block || hashMode}
        mode="decimal"
        minFractionDigits={2}
        value={total}
        onChange={(e) => {
          setTotal(e.value || 0);
        }}
        name="total"
      />
      <label htmlFor="">Valor suscripción:</label>
      <InputNumber
        required
        disabled={form?.form?.block || hashMode}
        mode="decimal"
        minFractionDigits={2}
        max={total}
        onChange={(e) => {
          setSubscriptionValue(e.value || 0);
        }}
        name="suscription"
        value={subscriptionValue}
      />
      <label htmlFor="">Número de cuotas:</label>
      <Dropdown
        required
        disabled={form?.form?.block || hashMode}
        value={numberFees}
        options={[
          {
            label: "1",
            value: 1,
          },
          {
            label: "2",
            value: 2,
          },
          {
            label: "3",
            value: 3,
          },
          {
            label: "4",
            value: 4,
          },
          {
            label: "5",
            value: 5,
          },
          {
            label: "6",
            value: 6,
          },
          {
            label: "7",
            value: 7,
          },
          {
            label: "8",
            value: 8,
          },
          {
            label: "9",
            value: 9,
          },
        ]}
        onChange={(e) => {
          setNumberFees(e.value);
        }}
        name="numberFees"
      />

      <label htmlFor="">Saldo mensual:</label>
      <InputNumber
        required
        mode="decimal"
        minFractionDigits={2}
        value={monthValue}
        disabled
      />

      <label htmlFor="">Total restante:</label>
      <InputText
        required
        value={String(remainingTotal)}
        keyfilter={"num"}
        disabled
      />
      {!payment && (
        <Button
          type="submit"
          disabled={form?.form?.block}
          label="Subir datos de pago"
          onClick={() => {
            createPaymentMutate({
              formId: form?.form?.id as number,
              numberFees: numberFees,
              suscription: subscriptionValue || 0,
              total: total || 0,
            });
          }}
        />
      )}
      {payment && (
        <Button
          disabled={form?.form?.block || hashMode}
          type="submit"
          label="Actualizar datos"
          onClick={() => {
            updatePaymentMutate({
              paymentId: payment.id as number,
              numberFees,
              suscription: subscriptionValue as number,
              total: total as number,
            });
          }}
        />
      )}
    </div>
  );
};

export default PaymentOptions;
