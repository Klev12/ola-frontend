import { DataTable } from "primereact/datatable";
import { CommissionGetDto } from "../../../../models/commission";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

interface ShowCommissionTable {
  commissions: CommissionGetDto[];
}

const ShowCommissionTable = ({ commissions }: ShowCommissionTable) => {
  return (
    <div>
      <DataTable value={commissions}>
        <Column header="Código De Formulario" field="formCode" />
        <Column header="Id De Transacción" field="transactionId" />
        <Column
          header="Vendedor"
          body={(commission: CommissionGetDto) => (
            <>
              <div>{commission.userFullname}</div>
              <Tag value={commission.userCode} />
            </>
          )}
        />
        <Column header="Monto De Transacción" field="amount" />
        <Column header="Monto De Comisión" field="userCommission" />
      </DataTable>
    </div>
  );
};

export default ShowCommissionTable;
