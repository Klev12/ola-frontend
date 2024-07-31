import { useContext, useEffect, useMemo, useRef, useState } from "react";
import PaymentOptions from "./components/PaymentOptions";
import PayphonePay from "./components/PayphonePay";
import { SalesFormContext } from "./components/WrapperSalesForm";
import { TransactionGetDto, TransactionStatus } from "../../models/transaction";
import { useQuery } from "react-query";
import { verifyStatusTransaction } from "../../services/transaction-service";
import useToggle from "../../hooks/useToggle";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import PayphoneCard from "./components/PayphoneCard";

const Payment = () => {
  const toast = useRef<Toast>(null);

  const { form } = useContext(SalesFormContext);

  const currentPendingTransaction = useMemo(() => {
    return form?.form?.transactions.find(
      (transaction) => transaction.statusCode === TransactionStatus.pending
    );
  }, [form]);

  const [acceptedTransaction, setAcceptedTransaction] = useState<
    TransactionGetDto | undefined
  >(undefined);
  const transactionDialog = useToggle();

  const checkStatus = useToggle(false);

  useEffect(() => {
    if (!!acceptedTransaction) transactionDialog.setTrue();
  }, [acceptedTransaction]);

  const {} = useQuery({
    queryFn: () =>
      verifyStatusTransaction(
        currentPendingTransaction?.transactionId as number
      ).then((res) => res.data),
    enabled: checkStatus.value,
    refetchInterval: 5000,
    onSuccess: (response) => {
      if (response.transaction.statusCode === TransactionStatus.accepted) {
        checkStatus.setFalse();
        toast.current?.show({
          severity: "success",
          summary: "Transacción realizada",
          detail: "La transacción fue realizada con éxito",
        });
        setAcceptedTransaction(response.transaction);
      }

      if (response.transaction.statusCode === TransactionStatus.cancelled) {
        checkStatus.setFalse();
        toast.current?.show({
          severity: "error",
          summary: "Transacción cancelada",
          detail: "La transacción fue cancelada, crea otra porfavor",
        });
      }
    },
  });

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
      <PayphonePay disableButton={checkStatus.value}>
        {checkStatus.value && (
          <>
            <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
            <label htmlFor="">Verificando transacción</label>
          </>
        )}
      </PayphonePay>
      <PayphoneCard />
    </div>
  );
};

export default Payment;
