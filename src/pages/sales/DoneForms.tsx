import doneSaleService from "../../services/done-sales-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { numberMonth } from "../../consts/translations/number-month";
import ShowDoneSales from "./components/ShowDoneSales";
import ShowElementList from "../../components/show-element-list/ShowElementList";
import { DoneSaleSummaryGetDto } from "../../models/done-sale";
import { SaleGetDto } from "../../models/sale";
import { useMemo } from "react";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";

interface DoneFormsProps {
  lastMonth?: boolean;
}

const DoneForms = ({ lastMonth = false }: DoneFormsProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const dateFilter = useMemo(() => {
    if (lastMonth) {
      return {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
    }
  }, [lastMonth]);

  return (
    <div>
      <ShowElementList
        url={doneSaleService.api.summaries}
        queryKey="done-sales"
        emptyElementsMessage="No hay ventas"
        expanded={true}
        dateFilter={dateFilter}
        limit={lastMonth ? 1 : 10}
        params={{ ownership: "mine" }}
        eachElement={(sale: DoneSaleSummaryGetDto, { count }) => {
          if (count - 1 <= 0 && lastMonth) {
            return <div>Aun no hay ventas en historial</div>;
          }

          return (
            <>
              <h2>
                {numberMonth[sale.month]} {sale.year}
              </h2>
              <DataTable
                value={[sale]}
                showGridlines
                emptyMessage="No hay ventas en el mes actual"
              >
                <Column
                  header="Total de Transacciones"
                  field="transactionTotal"
                />
                <Column
                  header="Monto total de transacciones"
                  field="transactionTotalAmount"
                />
                {authenticatedUser?.role !== Roles.collaborator && (
                  <Column
                    header="Monto total de comisiones"
                    field="userTotalCommission"
                  />
                )}
              </DataTable>
              <div style={{ margin: "20px" }}>
                <ShowElementList
                  url={doneSaleService.api.base}
                  dateFilter={{ month: sale.month, year: sale.year }}
                  expandButtonMessage="Ver ventas"
                  expanded={!lastMonth}
                  params={{ ownership: "mine" }}
                  allElement={(sales: SaleGetDto[]) => {
                    return <ShowDoneSales sales={sales} />;
                  }}
                />
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default DoneForms;
