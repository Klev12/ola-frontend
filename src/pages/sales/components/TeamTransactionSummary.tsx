import { ReactNode, useState } from "react";

import { Tag } from "primereact/tag";
import { useQuery } from "react-query";
import transactionSummaryService from "../../../services/transaction-summary-service";

import PaginatorPage from "../../../components/PaginatorPage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TeamGetDto } from "../../../models/team";

interface TeamTransactionSummaryProps {
  team?: TeamGetDto;
  footer?: ReactNode;
}

const TeamTransactionSummary = ({
  team,
  footer,
}: TeamTransactionSummaryProps) => {
  const [page, setPage] = useState(1);

  const { data: transactionSummaryData } = useQuery({
    queryFn: () =>
      transactionSummaryService
        .findAll({ page, teamId: team?.id })
        .then((res) => res.data),
    queryKey: ["transaction-summary", team?.id, page],
    enabled: !!team,
  });

  return (
    <div>
      <div>
        Creado por: {team?.userFullname} <Tag value={team?.userCode} />
      </div>
      {transactionSummaryData?.transactionSummaries.length === 0 && (
        <div style={{ margin: "20px" }}>No hay transacciones en este grupo</div>
      )}
      {transactionSummaryData?.transactionSummaries.map(
        (transactionSummary, index) => {
          return (
            <div key={index}>
              <h2>{`${transactionSummary.month} ${transactionSummary.year}`}</h2>
              <DataTable showGridlines value={[transactionSummary]}>
                <Column
                  header="Total transacciones completadas"
                  field="totalComplete"
                />
                <Column header="Total monto" field="totalCompleteAmount" />
                <Column
                  header="Total transacciones pendientes"
                  field="totalPending"
                />
                <Column header="Total monto" field="totalPendingAmount" />
              </DataTable>
              {footer}
            </div>
          );
        }
      )}
      <PaginatorPage
        limit={10}
        total={transactionSummaryData?.count}
        onPage={(page) => setPage(page)}
      />
    </div>
  );
};

export default TeamTransactionSummary;
