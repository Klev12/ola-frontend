import { useQuery } from "react-query";
import useQueryPath from "../../hooks/useQueryPath";
import { confirmTransaction } from "../../services/transaction-service";
import useToggle from "../../hooks/useToggle";
import { Card } from "primereact/card";
import { TransactionStatus } from "../../models/transaction";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";

const PaymentTransaction = () => {
  const query = useQueryPath();

  if (!query.get("id")) {
    return <div>id es requerido</div>;
  }

  if (!query.get("clientTransactionId")) {
    return <div>clientTransactionId es requerido</div>;
  }

  const checkStatus = useToggle(true);

  const { data: transactionData, isLoading } = useQuery({
    queryFn: () =>
      confirmTransaction({
        id: Number(query.get("id") as string),
        clientTxId: query.get("clientTransactionId")?.toString() as string,
      }).then((res) => res.data),
    refetchInterval: 5000,
    enabled: checkStatus.value,
    queryKey: ["transaction", query.get("clientTransactionId")],
    onSuccess: (response) => {
      if (
        response.transaction.statusCode === TransactionStatus.accepted ||
        response.transaction.statusCode === TransactionStatus.cancelled
      ) {
        checkStatus.setFalse();
      }
    },
  });

  const transactionStatus: {
    [key: number]: { severity: "success" | "danger" | "info"; details: string };
  } = {
    [TransactionStatus.accepted]: {
      severity: "success",
      details: "Aceptado",
    },
    [TransactionStatus.cancelled]: {
      severity: "danger",
      details: "Cancelado",
    },
    [TransactionStatus.pending]: {
      severity: "info",
      details: "Pendiente",
    },
    [0]: {
      severity: "info",
      details: "None",
    },
  };

  if (isLoading) {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <Card>
      <h2>
        {transactionData?.transaction.statusCode ===
          TransactionStatus.accepted && "Transacción exitosa!"}
      </h2>
      <p>Cliente: {transactionData?.transaction.costumerName}</p>
      <p>Monto: {transactionData?.transaction?.amount}</p>
      <p>
        Identificador de transacción:{" "}
        {transactionData?.transaction?.transactionId}
      </p>
      <p>Tienda: {transactionData?.transaction.storeName}</p>
      <p>Fecha: {String(transactionData?.transaction?.createdAt)}</p>
      <p>
        <Tag
          severity={
            transactionStatus?.[transactionData?.transaction.statusCode || 0]
              .severity
          }
          value={
            transactionStatus?.[transactionData?.transaction.statusCode || 0]
              .details
          }
        />
      </p>
    </Card>
  );
};

export default PaymentTransaction;
