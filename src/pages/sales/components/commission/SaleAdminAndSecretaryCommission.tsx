import { DataTable } from "primereact/datatable";
import { SummaryCommissionGetDto } from "../../../../models/commission";
import { numberMonth } from "../../../../consts/translations/number-month";
import { Column } from "primereact/column";
import ShowCommissionList from "./ShowCommissionList";

interface SaleAdminAndSecretaryCommissionProps {
  commissionSummaries: SummaryCommissionGetDto[];
  isExpanded?: boolean;
}

const SaleAdminAndSecretaryCommission = ({
  commissionSummaries,
  isExpanded,
}: SaleAdminAndSecretaryCommissionProps) => {
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
              <Column
                header="Monto Total de Comisiones de Jefe General de Grupo"
                field="generalAdminTotalCommission"
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

export default SaleAdminAndSecretaryCommission;
