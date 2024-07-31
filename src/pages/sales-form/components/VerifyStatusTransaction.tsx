import { useContext, useMemo, useRef } from "react";
import { SalesFormContext } from "./WrapperSalesForm";
import { Button } from "primereact/button";
import { TransactionStatus } from "../../../models/transaction";
import { useQuery } from "react-query";
import { verifyStatusTransaction } from "../../../services/transaction-service";
import useToggle from "../../../hooks/useToggle";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";

const VerifyStatusTransaction = () => {
  const toast = useRef<Toast>(null);

  const { form } = useContext(SalesFormContext);

  const { value: startCheckingStatus, toggle, setFalse } = useToggle(false);

  const currentPendingTransaction = useMemo(() => {
    const pendingTransaction = form?.form?.transactions.find(
      (transaction) => transaction.statusCode === TransactionStatus.pending
    );

    return pendingTransaction;
  }, [form]);

  const { data: transactionStatus } = useQuery({
    queryFn: () =>
      verifyStatusTransaction(
        currentPendingTransaction?.transactionId as number
      ).then((res) => res.data),
    enabled: startCheckingStatus,
    onSuccess: (data) => {
      if (data.transaction.statusCode === TransactionStatus.accepted) {
        setFalse();
      }
      if (data.transaction.statusCode === TransactionStatus.cancelled) {
        toast.current?.show({
          severity: "error",
          summary: "Transcacción",
          detail: "El usuario canceló la transcacción",
        });
        setFalse();
      }
    },
    onError: (data) => {
      const message = (data as any)?.response?.data?.error?.message;
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    },
    refetchInterval: 5000,
  });

  const pendingStatusMessage = {
    [TransactionStatus.pending]: "pendiente",
    [TransactionStatus.cancelled]: "cancelado",
    [TransactionStatus.accepted]: "aceptado",
    [4]: "ninguno",
  };

  return (
    <Card style={{ width: "200px" }}>
      <Toast ref={toast} />
      <Button
        type="button"
        label="Verificar estatus del pago"
        onClick={() => {
          if (!currentPendingTransaction) {
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "Crea una nueva transacción",
            });
            return;
          }
          toggle();
        }}
        loading={startCheckingStatus}
      />
      {startCheckingStatus && (
        <ProgressBar
          mode="indeterminate"
          style={{ height: "6px" }}
        ></ProgressBar>
      )}

      <Tag
        severity="info"
        value={
          pendingStatusMessage[transactionStatus?.transaction.statusCode || 4]
        }
      ></Tag>
    </Card>
  );
};

export default VerifyStatusTransaction;
