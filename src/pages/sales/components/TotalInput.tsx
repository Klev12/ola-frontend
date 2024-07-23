import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { PaymentGetDto } from "../../../models/payment";
import { useMutation } from "react-query";
import { patchTotalFormPayment } from "../../../services/forms-service";

interface TotalInputProps {
  payment?: PaymentGetDto;
  refetchForms?: () => void;
}

export const TotalInput = ({ payment, refetchForms }: TotalInputProps) => {
  const { mutate: patchTotalFormPaymentMutate } = useMutation(
    patchTotalFormPayment,
    {
      onSuccess: () => {
        if (refetchForms) {
          refetchForms();
        }
      },
    }
  );

  return (
    <form
      style={{ height: "100px" }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(
          new FormData(e.target as HTMLFormElement)
        );

        patchTotalFormPaymentMutate({
          total: parseFloat(formData["total"] as string),
          formId: payment?.form_id as number,
        });
      }}
    >
      <p>Monto actual: {payment?.total}</p>
      <label htmlFor="">Cambiar Monto a cobrar:</label>
      <InputNumber format={false} value={Number(payment?.total)} name="total" />
      <Button label="establecer" />
    </form>
  );
};
