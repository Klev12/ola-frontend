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
import copyText from "../../../utils/copy-text";
import { Tag } from "primereact/tag";

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
            header="Link"
            field="token"
            body={(value) => (
              <Button
                label="Copiar"
                onClick={() => {
                  console.log(`${window.location.host}}`);
                  copyText(
                    `${window.location.host}${ROUTES.PAYPHONE.LINK_TOKEN(
                      value.token
                    )}`
                  );
                }}
              />
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
