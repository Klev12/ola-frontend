import { useQuery } from "react-query";
import { getAllTransactions } from "../../services/transaction-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { TransactionGetDto, TransactionStatus } from "../../models/transaction";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import copyText from "../../utils/copy-text";
import ROUTES from "../../consts/routes";
import { useState } from "react";
import { Calendar } from "primereact/calendar";

const HistoryTransactions = () => {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState<Date | undefined>();

  const { data: transactionData } = useQuery({
    queryFn: () =>
      getAllTransactions({
        page: 1,
        month: date?.getMonth() ? date.getMonth() + 1 : undefined,
      }).then((res) => res.data),
    retry: 1,
    queryKey: ["transactions-history", date?.getMonth(), page],
  });

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
    <div>
      <div>
        <Calendar
          view="month"
          dateFormat="mm/yy"
          onChange={(e) => setDate(e.value as Date)}
        />
        <Button label="todos" onClick={() => setDate(undefined)} />
      </div>
      <DataTable value={transactionData?.transactions}>
        <Column header="Código de formulario" field="formCode" />
        <Column header="Creador" field="userFullname" />
        <Column header="Código" field="userCode" />
        <Column header="Cliente" field="costumerName" />
        <Column header="Monto" field="amount" />
        <Column
          header="Estatus"
          field="status"
          body={(value) => {
            return (
              <Tag severity={transactionStatus?.[value.statusCode].severity}>
                {transactionStatus?.[value.statusCode].details}
              </Tag>
            );
          }}
        />
        <Column
          header="Link"
          body={(value: TransactionGetDto) => (
            <Button
              outlined
              label="copiar"
              onClick={() => {
                copyText(
                  `${window.location.host}${ROUTES.PAYPHONE.LINK_TOKEN(
                    value.token
                  )}`
                );
              }}
            />
          )}
        />
        <Column header="Creado en" field="createdAt" />
      </DataTable>
      <Paginator
        first={page}
        rows={10}
        totalRecords={transactionData?.count}
        onPageChange={(e) => {
          setPage(e.page);
        }}
      />
    </div>
  );
};

export default HistoryTransactions;
