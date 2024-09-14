import { useQuery } from "react-query";
import useQueryPath from "../../hooks/useQueryPath";
import { confirmTransaction } from "../../services/transaction-service";
import useToggle from "../../hooks/useToggle";
import { Card } from "primereact/card";
import { TransactionStatus } from "../../models/transaction";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import formatDate from "../../utils/format-date";

const PaymentTransaction = () => {
  const query = useQueryPath();

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

  if (!query.get("id")) {
    return <div>id es requerido</div>;
  }

  if (!query.get("clientTransactionId")) {
    return <div>clientTransactionId es requerido</div>;
  }

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
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        maxWidth: "500px",
        margin: "10rem auto",
      }}
    >
      <h2 style={{ color: "#4caf50", marginBottom: "1rem" }}>
        {transactionData?.transaction.statusCode ===
          TransactionStatus.accepted && "Transacción exitosa!"}
      </h2>
      <p style={{ marginBottom: "0.5rem" }}>
        Cliente: {transactionData?.transaction.costumerName}
      </p>
      <p>Nombre de negocio: {transactionData?.transaction.businessName}</p>
      <p style={{ marginBottom: "0.5rem" }}>
        Monto: {transactionData?.transaction?.amount}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        Identificador de transacción:{" "}
        {transactionData?.transaction?.transactionId}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        Tienda: {transactionData?.transaction.storeName}
      </p>
      <p style={{ marginBottom: "1rem" }}>
        Fecha: {formatDate(transactionData?.transaction?.createdAt as string)}
      </p>
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
    </Card>
  );
};

export default PaymentTransaction;
