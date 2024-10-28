import { DataTable } from "primereact/datatable";
import { CommissionGetDto } from "../../../../models/commission";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Roles } from "../../../../models/user";
import useGlobalState from "../../../../store/store";

interface ShowCommissionTable {
  commissions: CommissionGetDto[];
}

const ShowCommissionTable = ({ commissions }: ShowCommissionTable) => {
  const authenticatedUser = useGlobalState((state) => state.user);

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
        {[
          Roles.admin,
          Roles.secretary,
          Roles.generalAdmin,
          Roles.groupAdmin,
        ].includes(authenticatedUser?.role as Roles) && (
          <Column
            header="Comisión De Jefe De Grupo"
            body={(commission: CommissionGetDto) => (
              <>
                {commission.groupAdminCommission
                  ? commission.groupAdminCommission
                  : 0}
              </>
            )}
          />
        )}
        {[Roles.admin, Roles.secretary, Roles.generalAdmin].includes(
          authenticatedUser?.role as Roles
        ) && (
          <Column
            header="Comisión De Jefe General"
            body={(commission: CommissionGetDto) => (
              <>
                {commission.generalAdminCommission
                  ? commission.generalAdminCommission
                  : 0}
              </>
            )}
          />
        )}
      </DataTable>
    </div>
  );
};

export default ShowCommissionTable;
