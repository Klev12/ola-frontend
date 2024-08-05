import { DataTable } from "primereact/datatable";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getAllTransactions } from "../../services/transaction-service";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { TransactionStatus } from "../../models/transaction";
import { useState } from "react";

const UserTransactions = () => {
  const { userId } = useParams();

  const { data: transactionsData } = useQuery({
    queryFn: () =>
      getAllTransactions({ userId: Number(userId) }).then((res) => res.data),
    queryKey: ["transactions", userId],
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

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DataTable
        paginator
        rows={transactionsData?.count}
        totalRecords={transactionsData?.count}
        rowsPerPageOptions={[1, 5, 10, 20]}
        first={currentPage}
        onPage={(page) => {
          setCurrentPage(page.first);
        }}
        header={`Transacciones totales: ${transactionsData?.count}`}
        value={transactionsData?.transactions}
        emptyMessage="No hay transacciones"
      >
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

        <Column header="Monto" field="amount" />
        <Column header="Creación" field="createdAt" />
      </DataTable>
      <>
        total:{" "}
        {transactionsData?.transactions.reduce(
          (accumulator, before) => Number(accumulator) + Number(before.amount),
          0
        )}
      </>
    </div>
  );
};

export default UserTransactions;
