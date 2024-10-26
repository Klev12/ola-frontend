import { DataTable } from "primereact/datatable";
import { SummaryCommissionGetDto } from "../../../../models/commission";
import { Column } from "primereact/column";
import { numberMonth } from "../../../../consts/translations/number-month";
import ShowCommissionList from "./ShowCommissionList";

interface SaleUserCommissionProps {
  commissionSummaries: SummaryCommissionGetDto[];
  isExpanded?: boolean;
}

const SaleUserCommission = ({
  commissionSummaries,
  isExpanded,
}: SaleUserCommissionProps) => {
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
                header="Total de comisiones"
                field="userTotalCommission"
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

export default SaleUserCommission;
