import {
  DoneSaleGetDto,
  DoneSaleSummaryGetDto,
  TransactionValidity,
} from "../../../models/done-sale";
import { useQuery } from "react-query";
import doneSaleService from "../../../services/done-sales-service";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import PaginatorPage from "../../../components/PaginatorPage";
import ROUTES from "../../../consts/routes";
import { Link } from "react-router-dom";

interface ShowDoneSalesProps {
  doneSaleSummary: DoneSaleSummaryGetDto;
}

const ShowDoneSales = ({ doneSaleSummary }: ShowDoneSalesProps) => {
  const [page, setPage] = useState(1);

  const { data: doneSalesData } = useQuery({
    queryFn: () =>
      doneSaleService
        .findAll({
          options: { page, limit: 10 },
          month: doneSaleSummary.month,
          year: doneSaleSummary.year,
        })
        .then((res) => res.data),
    queryKey: ["done-sales", doneSaleSummary.month, doneSaleSummary.year],
  });

  return (
    <div style={{ justifySelf: "end" }}>
      <DataTable
        value={doneSalesData?.sales}
        emptyMessage="No hay ventas en este mes"
        showGridlines
      >
        <Column header="Código" field="code" />
        <Column
          header="Tipo de formulario"
          body={(sale: DoneSaleGetDto) => (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Tag value={sale.contractTag} />
              <Link to={`${ROUTES.SALES.FORM_EDITOR_ID(sale.id)}`}>
                revisar
              </Link>
            </div>
          )}
        />
        <Column header="Transacción ID" field="transactionId" />
        <Column header="Monto de transacción" field="transactionAmount" />
        <Column header="Monto de comisión" field="userCommission" />
        <Column
          header="Validez"
          body={(sale: DoneSaleGetDto) => (
            <Tag
              severity={
                sale.transactionValidity === TransactionValidity.valid
                  ? "success"
                  : "danger"
              }
              value={
                sale.transactionValidity === TransactionValidity.valid
                  ? "aprobado"
                  : "inválido"
              }
            />
          )}
        />
      </DataTable>
      <PaginatorPage
        limit={10}
        total={doneSalesData?.count}
        onPage={(page) => setPage(page - 1)}
      />
    </div>
  );
};

export default ShowDoneSales;
