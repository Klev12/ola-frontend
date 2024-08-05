import { useQuery } from "react-query";
import commissionService from "../../services/commission-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CommissionGetDto } from "../../models/commission";
import { Tag } from "primereact/tag";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const Commission = () => {
  const [currentPage, setCurrenPage] = useState(0);

  const { data: commissionData } = useQuery({
    queryFn: () =>
      commissionService
        .findAll({ page: currentPage + 1, limit: 10 })
        .then((res) => res.data),
    queryKey: ["commissions", currentPage],
  });

  return (
    <div>
      <DataTable
        header="Comisiones"
        value={commissionData?.commissions}
        emptyMessage="No hay comisiones"
      >
        <Column header="Valor pagado" field="amount" />
        <Column header="usuario" field="userFullname" />
        <Column header="ganancia" field="userCommission" />
        <Column header="jefe de grupo" field="groupAdminFullname" />
        <Column header="ganancia" field="groupAdminCommission" />
        <Column
          header="Estado"
          field="collected"
          body={(value: CommissionGetDto) =>
            value.collected ? (
              <Tag severity="success" value="cobrado" />
            ) : (
              <Tag severity="danger" value="sin cobrar" />
            )
          }
        />
        <Column header="Creada en" field="createdAt" />
      </DataTable>
      <Paginator
        first={currentPage}
        rows={10}
        totalRecords={commissionData?.count}
        onPageChange={(value) => {
          setCurrenPage(value.first);
        }}
      />
    </div>
  );
};

export default Commission;
