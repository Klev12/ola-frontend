import { Card } from "primereact/card";
import { PaymentGetDto } from "../../../models/payment";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import {
  createPayment,
  updatePayment,
} from "../../../services/payment-service";
import { SalesFormContext } from "./WrapperSalesForm";

interface PaymentOptionsProps {
  payment?: PaymentGetDto;
  formId?: number;
}

const PaymentOptions = ({}: PaymentOptionsProps) => {
  const { form } = useContext(SalesFormContext);
  const [payment, setPayment] = useState(form?.form?.payment);

  useEffect(() => {
    console.log(form);
    setPayment(form?.form?.payment);
  }, [form]);

  const { mutate: createPaymentMutate } = useMutation(createPayment, {
    onSuccess: (response) => {
      setPayment(response.data.payment);
    },
  });

  const { mutate: updatePaymentMutate } = useMutation(updatePayment);

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
    <div style={{ width: "200px" }}>
      <label htmlFor="">Total a pagar:</label>
      <InputNumber
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
        mode="decimal"
        minFractionDigits={2}
        value={monthValue}
        disabled
      />

      <label htmlFor="">Total restante:</label>
      <InputText value={String(remainingTotal)} keyfilter={"num"} disabled />
      {!payment && (
        <Button
          type="submit"
          label="Generar pago"
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
