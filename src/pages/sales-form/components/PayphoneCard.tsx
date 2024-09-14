import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { FormEventHandler, useContext } from "react";
import { useMutation } from "react-query";
import { createTransactionWithCard } from "../../../services/transaction-service";
import { SalesFormContext } from "./WrapperSalesForm";

const PayphoneCard = () => {
  const { formInfo } = useContext(SalesFormContext);

  const cardFormDialog = useToggle();

  const { mutate: createTransactionWithCardMutate } = useMutation(
    createTransactionWithCard
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    const cardNumber = formData["cardNumber"].toString().replace(/\s/g, "");
    const holderName = formData["holderName"].toString();
    const expirationDate =
      formData["expirationDate"].toString().match(/\d+/g) || [];
    const expirationMonth = expirationDate?.[0] as string;
    const expirationYear = expirationDate?.[1] as string;
    const securityCode = formData["securityCode"].toString();
    const email = formData["email"].toString();

    createTransactionWithCardMutate({
      cardNumber,
      holderName,
      expirationMonth,
      expirationYear: (2000 + Number(expirationYear)).toString(),
      securityCode,
      email,
      formId: formInfo?.id as number,
    });
  };

  return (
    <div>
      <Button
        label="Pagar con tarjeta"
        onClick={() => cardFormDialog.toggle()}
      />
      <Dialog
        header="Pago con tarjeta"
        draggable={false}
        style={{ width: "50vw" }}
        visible={cardFormDialog.value}
        onHide={() => cardFormDialog.toggle()}
      >
        <form
          action=""
          style={{ display: "grid", gap: 20 }}
          onSubmit={onSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Número de tarjeta: </label>
            <InputMask
              required
              mask="9999 9999 9999 9999"
              placeholder="0000 0000 0000 0000"
              name="cardNumber"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Nombre del propetario de la tarjeta: </label>

            <InputText required placeholder="Juan" name="holderName" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Fecha de expiración: </label>
            <InputMask
              required
              mask="99/99"
              placeholder="07/30"
              name="expirationDate"
              slotChar="mm/yy"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Código de seguridad: </label>
            <InputMask
              required
              mask="999"
              placeholder="123"
              name="securityCode"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Email: </label>
            <InputText
              required
              type="email"
              inputMode="email"
              placeholder="example@email.com"
              name="email"
            />
          </div>
          <Button label="Pagar" />
        </form>
      </Dialog>
    </div>
  );
};

export default PayphoneCard;
