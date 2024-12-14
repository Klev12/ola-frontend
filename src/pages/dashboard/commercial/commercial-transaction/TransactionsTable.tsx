import { DataTable } from "primereact/datatable";
import {
  TransactionGetDto,
  TransactionStatus,
} from "../../../../models/transaction";
import { Column } from "primereact/column";
import { TransactionValidity } from "../../../../models/done-sale";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import transactionService from "../../../../services/transaction-service";
import ROUTES from "../../../../consts/routes";

interface TransactionsTableProps {
  transactions: TransactionGetDto[];
  onSuccessChangeValidity?: () => void;
}

const TransactionsTable = ({
  transactions,
  onSuccessChangeValidity,
}: TransactionsTableProps) => {
  const { mutate: changeValidity, isLoading } = useMutation(
    ({
      transactionId,
      validity,
    }: {
      transactionId: number;
      validity: TransactionValidity;
    }) => transactionService.changeValidity({ transactionId, validity }),
    { onSuccess: onSuccessChangeValidity }
  );

  const transactionStatus: {
    [key: number]: { severity: "success" | "info"; details: string };
  } = {
    [TransactionStatus.pending]: {
      severity: "info",
      details: "Pendiente",
    },
    [TransactionStatus.accepted]: {
      severity: "success",
      details: "Aceptado",
    },
  };

  return (
    <DataTable value={transactions}>
      <Column header="Código de formulario" field="formCode" />
      <Column header="Identificador" field="id" />
      <Column
        header="Vendedor"
        body={(transaction: TransactionGetDto) => (
          <div style={{ display: "grid" }}>
            {transaction.userFullname}
            <Tag
              style={{ width: "fit-content" }}
              value={transaction.userCode}
            />
          </div>
        )}
      />
      <Column header="Nombre de cliente" field="costumerName" />
      <Column header="Nombre de negocio" field="businessName" />

      <Column
        header="Estatus"
        field="statusCode"
        body={(transaction: TransactionGetDto) => (
          <Tag
            severity={transactionStatus[transaction.statusCode].severity}
            value={transactionStatus[transaction.statusCode].details}
          />
        )}
      />
      <Column
        header="Validez"
        body={(transaction: TransactionGetDto) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Tag
              style={{ width: "fit-content" }}
              severity={
                transaction.validity == TransactionValidity.valid
                  ? "success"
                  : "danger"
              }
              value={
                transaction.validity === TransactionValidity.valid
                  ? "Válido"
                  : "Inválido"
              }
            />
            <Button
              disabled={isLoading}
              loading={isLoading}
              style={{ width: "fit-content" }}
              outlined
              label={
                transaction.validity === TransactionValidity.valid
                  ? "Invalidar"
                  : "Validar"
              }
              onClick={() => {
                changeValidity({
                  transactionId: transaction.id,
                  validity:
                    transaction.validity === TransactionValidity.valid
                      ? TransactionValidity.invalid
                      : TransactionValidity.valid,
                });
              }}
            />
          </div>
        )}
      />

      <Column header="Monto" field="amount" />
      <Column
        header="Link de pago"
        body={(transaction: TransactionGetDto) => (
          <a
            href={`${window.location.origin}/${ROUTES.PAYMENT.TOKEN(
              transaction.token
            )}`}
            target="_blank"
          >
            Abrir link de pago
          </a>
        )}
      />
      <Column header="Creado en" field="createdAt" />
    </DataTable>
  );
};

export default TransactionsTable;
