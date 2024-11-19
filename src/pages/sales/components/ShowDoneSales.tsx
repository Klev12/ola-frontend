import { DoneSaleGetDto, TransactionValidity } from "../../../models/done-sale";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import ROUTES from "../../../consts/routes";
import { Link } from "react-router-dom";
import { SaleGetDto, SalePaymentMethod } from "../../../models/sale";
import useGlobalState from "../../../store/store";
import { Roles } from "../../../models/user";
import { translatedPaymentMethod } from "../../../consts/translations/sale-translations";

interface ShowDoneSalesProps {
  sales: SaleGetDto[];
}

const ShowDoneSales = ({ sales }: ShowDoneSalesProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  return (
    <div>
      <DataTable
        size="small"
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
        <Column header="Cliente" field="transactionCustomerName" />
        <Column header="Nombre de negocio" field="transactionBusinessName" />
        <Column
          header="Método de pago"
          body={(sale: DoneSaleGetDto) => (
            <>
              {translatedPaymentMethod[sale.paymentMethod as SalePaymentMethod]}
            </>
          )}
        />
        <Column
          header="Servicio"
          body={(sale: DoneSaleGetDto) => (
            <>
              {sale.serviceTitle && (
                <>
                  {sale.serviceTitle} -- {sale.serviceOptionTitle}
                </>
              )}
            </>
          )}
        />
        <Column header="Capacitación" field="courseTitle" />

        <Column header="Transacción id" field="transactionId" />
        <Column header="Monto de transacción" field="transactionAmount" />
        {authenticatedUser?.role !== Roles.collaborator && (
          <Column header="Monto de comisión" field="userCommission" />
        )}
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
        <Column header="Creado en" field="createdAt" />
      </DataTable>
    </div>
  );
};

export default ShowDoneSales;
