import { DataTable } from "primereact/datatable";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getAllTransactions } from "../../services/transaction-service";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { TransactionStatus } from "../../models/transaction";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const UserTransactions = () => {
  const { userId } = useParams();

  const [currentPage, setCurrentPage] = useState(0);

  const { data: transactionsData } = useQuery({
    queryFn: () =>
      getAllTransactions({
        userId: Number(userId),
        page: currentPage + 1,
        limit: 10,
      }).then((res) => res.data),
    queryKey: ["transactions", userId, currentPage],
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
        <DataTable
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
              return (
                <Tag severity={transactionStatus?.[value.statusCode].severity}>
                  {transactionStatus?.[value.statusCode].details}
                </Tag>
              );
            }}
          />

          <Column header="Monto" field="amount" />
          <Column header="Código de formulario" field="formCode" />
          <Column header="Creación" field="createdAt" />
        </DataTable>
        <Paginator
          first={currentPage === 0 ? currentPage : currentPage + 10}
          rows={10}
          totalRecords={transactionsData?.count}
          onPageChange={(e) => {
            setCurrentPage(e.page);
          }}
        />
      </div>
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
