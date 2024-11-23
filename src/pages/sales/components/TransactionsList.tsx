import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import {
  TransactionGetDto,
  TransactionStatus,
} from "../../../models/transaction";
import { FormGetDto } from "../../../models/forms";
import ROUTES from "../../../consts/routes";
import { Tag } from "primereact/tag";
import CopyButton from "../../../core/components/CopyButton";

interface TransactionsListProps {
  transactions?: TransactionGetDto[];
  form?: FormGetDto;
}

const TransactionsList = ({ transactions, form }: TransactionsListProps) => {
  const transactionDialog = useToggle();

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
    <>
      <Button
        label="Ver transacciones"
        onClick={() => transactionDialog.setTrue()}
      />
      <Dialog
        header={`Formulario ${form?.code}`}
        draggable={false}
        style={{ width: "50vw" }}
        visible={transactionDialog.value}
        onHide={() => transactionDialog.setFalse()}
      >
        <h3>Transacciones</h3>
        <DataTable value={transactions} emptyMessage="No hay transacciones">
          <Column
            field="statusCode"
            header="Estatus"
            body={(value) => {
              console.log();
              return (
                <Tag severity={transactionStatus?.[value.statusCode].severity}>
                  {transactionStatus?.[value.statusCode].details}
                </Tag>
              );
            }}
          />
          <Column
            header="Link de Pago"
            field="token"
            body={(value) => (
              <div style={{ display: "flex", alignItems: "end", gap: "10px" }}>
                <a
                  href={`${window.location.origin}/${ROUTES.PAYMENT.TOKEN(
                    value.token
                  )}`}
                  target="_blank"
                >
                  Ver link
                </a>
                <CopyButton
                  text={`${window.location.origin}/${ROUTES.PAYMENT.TOKEN(
                    value.token
                  )}`}
                  message="Link copiado"
                />
              </div>
            )}
          />
          <Column header="Monto" field="amount" />
          <Column header="Creación" field="createdAt" />
        </DataTable>
      </Dialog>
    </>
  );
};

export default TransactionsList;
