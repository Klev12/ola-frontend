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
import Timer from "../../components/Timer";

const Payment = () => {
  const toast = useRef<Toast>(null);

  const { formInfo, isFormExpire } = useContext(SalesFormContext);

  const currentPendingTransaction = useMemo(() => {
    return formInfo?.transactions.find(
      (transaction) => transaction.statusCode === TransactionStatus.pending
    );
  }, [formInfo]);

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
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        marginTop: "20px",
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
      {isFormExpire && (
        <div>
          <h2>El formulario expiró</h2>
        </div>
      )}
      {!isFormExpire && (
        <>
          <div>
            <PaymentOptions />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {formInfo?.expire_hash_time && (
              <Timer expiryTimestamp={new Date(formInfo.expire_hash_time)} />
            )}
            <ConfirmSale />
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
