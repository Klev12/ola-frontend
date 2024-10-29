import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SummaryCommissionGetDto } from "../../../../models/commission";
import { numberMonth } from "../../../../consts/translations/number-month";
import { Roles } from "../../../../models/user";
import useGlobalState from "../../../../store/store";

interface ShowCommissionSummaryTableProps {
  commissionSummary: SummaryCommissionGetDto;
}

const ShowCommissionSummaryTable = ({
  commissionSummary,
}: ShowCommissionSummaryTableProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  return (
    <div>
      <h2>
        {numberMonth[commissionSummary.month]} {commissionSummary.year}
      </h2>
      <DataTable value={[commissionSummary]}>
        <Column
          header="Monto Total De Comisiones"
          field="totalUserCommission"
        />
        {[
          Roles.admin,
          Roles.secretary,
          Roles.generalAdmin,
          Roles.groupAdmin,
        ].includes(authenticatedUser?.role as Roles) && (
          <Column
            header="Monto Total De Jefe de grupo"
            field="totalGroupAdminCommission"
          />
        )}
        {[Roles.admin, Roles.secretary, Roles.generalAdmin].includes(
          authenticatedUser?.role as Roles
        ) && (
          <Column
            header="Monto Total De Comisiones De Jefe General"
            field="generalAdminCommission"
          />
        )}
      </DataTable>
    </div>
  );
};

export default ShowCommissionSummaryTable;
