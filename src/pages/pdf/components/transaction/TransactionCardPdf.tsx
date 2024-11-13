import formatDateEs from "../../../../utils/format-date-es";
import { FormMetadata } from "../FormPdf";

interface TransactionCardPdfProps {
  metadata?: FormMetadata;
}

const TransactionCardPdf = ({ metadata }: TransactionCardPdfProps) => {
  return (
    <div style={{ breakInside: "avoid", pageBreakBefore: "always" }}>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Factura
      </h2>
      {metadata?.transactions?.map((transaction) => {
        return (
          <div
            key={transaction.id}
            style={{
              width: "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Fecha:</span>
              <span style={{ paddingLeft: "120px" }}>
                {" "}
                {formatDateEs(transaction.createdAt)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Nombre de negocio:</span>
              <span>{transaction.businessName}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Cliente:</span>
              <span>{transaction.costumerName}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                Identificador de transacción:
              </span>
              <span>{transaction.clientTransactionId}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Tienda:</span>
              <span>{transaction.storeName}</span>
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold" }}>Monto:</span>
              <span style={{ fontWeight: "bold" }}>${transaction.amount}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionCardPdf;
