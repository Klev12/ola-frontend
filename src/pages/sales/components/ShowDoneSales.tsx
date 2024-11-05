import { DoneSaleGetDto, TransactionValidity } from "../../../models/done-sale";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import ROUTES from "../../../consts/routes";
import { Link } from "react-router-dom";
import { SaleGetDto } from "../../../models/sale";

interface ShowDoneSalesProps {
  sales: SaleGetDto[];
}

const ShowDoneSales = ({ sales }: ShowDoneSalesProps) => {
  return (
    <div>
      <DataTable
        value={sales}
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
    </div>
  );
};

export default ShowDoneSales;
