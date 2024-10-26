import { useQuery } from "react-query";
import {
  CommissionGetDto,
  SummaryCommissionGetDto,
} from "../../../../models/commission";
import commissionService from "../../../../services/commission-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useState } from "react";
import PaginatorPage from "../../../../components/PaginatorPage";
import useGlobalState from "../../../../store/store";
import { Roles } from "../../../../models/user";

interface ShowCommissionListProps {
  commissionSummary: SummaryCommissionGetDto;
  isExpanded?: boolean;
}

const ShowCommissionList = ({
  commissionSummary,
  isExpanded,
}: ShowCommissionListProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);
  const [page, setPage] = useState(1);

  const { data: commissionsData } = useQuery({
    queryFn: () =>
      commissionService
        .findAll({
          page,
          limit: 10,
          month: commissionSummary.month,
          year: commissionSummary.year,
          ownership:
            authenticatedUser?.role !== Roles.sales ? "all-by-team" : "mine",
        })
        .then((res) => res.data),
    queryKey: [
      "commissions",
      page,
      commissionSummary.month,
      commissionSummary.year,
    ],
  });

  return (
    <div style={{ margin: "20px" }}>
      <DataTable value={commissionsData?.commissions} showGridlines>
        <Column header="Código de Formulario" field="formCode" />
        <Column header="Id de Transacción" field="transactionId" />
        <Column
          header="Vendedor"
          body={(commission: CommissionGetDto) => (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              {commission.userFullname}
              <Tag value={commission.userCode} />
            </div>
          )}
        />
        <Column header="Monto" field="amount" />
        <Column header="Comisión" field="userCommission" />
      </DataTable>
      <PaginatorPage
        limit={10}
        total={commissionsData?.count}
        onPage={(page) => setPage(page + 1)}
      />
    </div>
  );
};

export default ShowCommissionList;
