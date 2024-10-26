import { useState } from "react";
import { useQuery } from "react-query";
import doneSaleService from "../../services/done-sales-service";
import useGlobalState from "../../store/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { numberMonth } from "../../consts/translations/number-month";
import ShowDoneSales from "./components/ShowDoneSales";

const DoneForms = () => {
  const [page] = useState(1);

  const authenticatedUser = useGlobalState((state) => state.user);

  const { data: doneSaleSummariesData } = useQuery({
    queryFn: () =>
      doneSaleService
        .findAllSummaries({
          options: { page, limit: 1 },
          userId: authenticatedUser?.id as number,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        })
        .then((res) => res.data),
    queryKey: ["done-sale-summaries"],
  });

  return (
    <div>
      {doneSaleSummariesData?.saleSummaries.length === 0 && (
        <div>No hay ventas en el mes actual</div>
      )}
      {doneSaleSummariesData?.saleSummaries.map((saleSummary, index) => {
        return (
          <div key={index}>
            <h2>
              {numberMonth[saleSummary.month]} {saleSummary.year}
            </h2>
            <DataTable
              value={[saleSummary]}
              showGridlines
              emptyMessage="No hay ventas en el mes actual"
            >
              <Column
                header="Monto total de transacciones"
                field="transactionTotalAmount"
              />
              <Column
                header="Monto total de comisiones"
                field="userTotalCommission"
              />
            </DataTable>
            <div style={{ padding: "20px" }}>
              <ShowDoneSales doneSaleSummary={saleSummary} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoneForms;
