import { Card } from "primereact/card";
import {
  TransactionGetDto,
  TransactionStatus,
} from "../../../../models/transaction";
import formatDate from "../../../../utils/format-date";
import { Tag } from "primereact/tag";

interface TransactionCardProps {
  transaction?: TransactionGetDto;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
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
        {transaction?.statusCode === TransactionStatus.accepted &&
          "Transacción exitosa!"}
      </h2>
      <p style={{ marginBottom: "0.5rem" }}>
        Cliente: {transaction?.costumerName}
      </p>
      <p>Nombre de negocio: {transaction?.businessName}</p>
      <p style={{ marginBottom: "0.5rem" }}>Monto: {transaction?.amount}</p>
      <p style={{ marginBottom: "0.5rem" }}>
        Identificador de transacción: {transaction?.transactionId}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>Tienda: {transaction?.storeName}</p>
      <p style={{ marginBottom: "1rem" }}>
        Fecha: {formatDate(transaction?.createdAt as string)}
      </p>
      <Tag
        severity={transactionStatus?.[transaction?.statusCode || 0].severity}
        value={transactionStatus?.[transaction?.statusCode || 0].details}
      />
    </Card>
  );
};

export default TransactionCard;
