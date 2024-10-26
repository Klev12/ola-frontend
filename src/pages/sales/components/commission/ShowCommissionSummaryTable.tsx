import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SummaryCommissionGetDto } from "../../../../models/commission";
import { numberMonth } from "../../../../consts/translations/number-month";

interface ShowCommissionSummaryTableProps {
  commissionSummary: SummaryCommissionGetDto;
}

const ShowCommissionSummaryTable = ({
  commissionSummary,
}: ShowCommissionSummaryTableProps) => {
  return (
    <div>
      <h2>
        {numberMonth[commissionSummary.month]} {commissionSummary.year}
      </h2>
      <DataTable value={[commissionSummary]}>
        <Column header="Total de comisiones" field="userTotalCommission" />
      </DataTable>
    </div>
  );
};

export default ShowCommissionSummaryTable;
