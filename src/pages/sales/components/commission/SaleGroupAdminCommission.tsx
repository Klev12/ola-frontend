import { DataTable } from "primereact/datatable";
import { numberMonth } from "../../../../consts/translations/number-month";
import { SummaryCommissionGetDto } from "../../../../models/commission";
import { Column } from "primereact/column";
import ShowCommissionList from "./ShowCommissionList";

interface SaleGroupAdminCommissionProps {
  commissionSummaries: SummaryCommissionGetDto[];
  isExpanded?: boolean;
}

const SaleGroupAdminCommission = ({
  commissionSummaries,
  isExpanded,
}: SaleGroupAdminCommissionProps) => {
  return (
    <div>
      {commissionSummaries.length === 0 && (
        <div>No hay comisiones en el mes actual</div>
      )}
      {commissionSummaries.map((commissionSummary, index) => {
        return (
          <div key={index}>
            <h2>
              {numberMonth[commissionSummary.month]} {commissionSummary.year}
            </h2>
            <DataTable value={[commissionSummary]}>
              <Column
                header="Monto Total de Comisiones"
                field="userTotalCommission"
              />
              <Column
                header="Monto Total de Comisiones de Jefe de Grupo"
                field="groupAdminTotalCommission"
              />
            </DataTable>
            <ShowCommissionList
              isExpanded={isExpanded}
              commissionSummary={commissionSummary}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SaleGroupAdminCommission;
