import { useContext, useEffect, useMemo, useRef, useState } from "react";
import PaymentOptions from "./components/PaymentOptions";
import { SalesFormContext } from "./components/WrapperSalesForm";
import { TransactionGetDto, TransactionStatus } from "../../models/transaction";
import useToggle from "../../hooks/useToggle";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import ConfirmSale from "./components/ConfirmSale";

const Payment = () => {
  const toast = useRef<Toast>(null);

  const { form } = useContext(SalesFormContext);

  const currentPendingTransaction = useMemo(() => {
    return form?.form?.transactions.find(
      (transaction) => transaction.statusCode === TransactionStatus.pending
    );
  }, [form]);

  const [acceptedTransaction] = useState<TransactionGetDto | undefined>(
    undefined
  );
  const transactionDialog = useToggle();

  const checkStatus = useToggle(false);

  useEffect(() => {
    if (currentPendingTransaction) {
      checkStatus.setTrue();
    }
  }, [currentPendingTransaction]);

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        gap: 50,
        justifyContent: "center",
        paddingTop: "20px",
        gridTemplateColumns: "1fr 1fr",
        padding: "20px",
      }}
    >
      <Dialog
        visible={transactionDialog.value}
        onHide={() => {
          transactionDialog.toggle();
          navigate(ROUTES.SALES.DONE_FORMS);
        }}
      >
        <p>Monto: {(acceptedTransaction?.amount as number) / 100}$</p>
        <p>Nombre de tienda: {acceptedTransaction?.storeName}</p>
        <p>
          Id de transacción del cliente:{" "}
          {acceptedTransaction?.clientTransactionId}
        </p>
        <p>Id de transacción: {acceptedTransaction?.transactionId}</p>
        <p>Estatus: aceptado</p>
      </Dialog>
      <Toast ref={toast} />
      <PaymentOptions />
      {/* <PayphonePay disableButton={checkStatus.value}>
        {checkStatus.value && (
          <>
            <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
            <label htmlFor="">Verificando transacción</label>
          </>
        )}
      </PayphonePay>

      <PayphoneCard /> */}
      <ConfirmSale />
    </div>
  );
};

export default Payment;
