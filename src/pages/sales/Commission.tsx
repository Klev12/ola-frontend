import { useQuery } from "react-query";
import commissionService from "../../services/commission-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CommissionGetDto } from "../../models/commission";
import { Tag } from "primereact/tag";
import { ReactNode, useState } from "react";
import { Paginator } from "primereact/paginator";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

interface CommissionProps {
  collected?: boolean;
}

const Commission = ({ collected = false }: CommissionProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);
  const [currentPage, setCurrenPage] = useState(0);
  const [date, setDate] = useState<Date | undefined>();

  const { data: commissionData } = useQuery({
    queryFn: () =>
      commissionService
        .findAll({
          page: currentPage + 1,
          limit: 10,
          collected,
          month: date?.getMonth() ? date.getMonth() + 1 : undefined,
        })
        .then((res) => res.data),
    queryKey: ["commissions", currentPage, date?.getMonth()],
  });

  const commissionByRole: { [key: string]: ReactNode } = {
    [Roles.sales]: (
      <DataTable
        header={`Comisiones ${commissionData?.count}`}
        value={commissionData?.commissions}
        emptyMessage="No hay comisiones"
      >
        <Column header="Código formulario" field="formCode" />
        <Column header="valor transacción" field="amount" />
        <Column header="vendedor" field="userFullname" />
        <Column header="ganancia 10%" field="userCommission" />
        <Column header="nombre de grupo" field="teamName" />
        <Column header="Creada en" field="createdAt" />
      </DataTable>
    ),
    [Roles.groupAdmin]: (
      <DataTable
        header={`Comisiones ${commissionData?.count}`}
        value={commissionData?.commissions}
        emptyMessage="No hay comisiones"
      >
        <Column header="Código formulario" field="formCode" />
        <Column header="valor transacción" field="amount" />
        <Column header="vendedor" field="userFullname" />
        <Column
          header="ganancia"
          field="userCommission"
          body={(value: CommissionGetDto) => (
            <>
              <p>{value.userCommission}</p>
              <Badge
                severity={
                  authenticatedUser?.id === value.userId ? "success" : "info"
                }
                value={`${
                  parseFloat((value.userCommission / value.amount).toFixed(2)) *
                  100
                }%`}
              ></Badge>
            </>
          )}
        />
        <Column header="nombre de grupo" field="teamName" />
        <Column header="jefe de grupo" field="groupAdminFullname" />
        <Column
          header="ganancia"
          field="groupAdminCommission"
          body={(value: CommissionGetDto) => (
            <>
              {authenticatedUser?.id !== value.userId && (
                <div>
                  <p>{value.groupAdminCommission}</p>
                  {value.groupAdminCommission && (
                    <Badge
                      severity={
                        authenticatedUser?.id === value.userId ||
                        authenticatedUser?.id === value.groupAdminId
                          ? "success"
                          : "info"
                      }
                      value={`${
                        parseFloat(
                          (value.groupAdminCommission / value.amount).toFixed(2)
                        ) * 100
                      }%`}
                    ></Badge>
                  )}
                </div>
              )}
            </>
          )}
        />

        <Column header="Creada en" field="createdAt" />
      </DataTable>
    ),
    [Roles.generalAdmin]: (
      <DataTable
        header={`Comisiones ${commissionData?.count}`}
        value={commissionData?.commissions}
        emptyMessage="No hay comisiones"
      >
        <Column header="Código formulario" field="formCode" />
        <Column header="valor transacción" field="amount" />
        <Column header="vendedor" field="userFullname" />
        <Column
          header="ganancia"
          field="userCommission"
          body={(value: CommissionGetDto) => (
            <div>
              <p>{value.userCommission}</p>

              <Badge
                severity={
                  authenticatedUser?.id === value.userId ? "success" : "info"
                }
                value={`${
                  parseFloat((value.userCommission / value.amount).toFixed(2)) *
                  100
                }%`}
              ></Badge>
            </div>
          )}
        />
        <Column header="nombre de grupo" field="teamName" />
        <Column header="jefe de grupo" field="groupAdminFullname" />
        <Column
          header="ganancia"
          field="generalAdminCommission"
          body={(value: CommissionGetDto) => (
            <div>
              <p>
                {authenticatedUser?.id !== value.userId && (
                  <>
                    {value.generalAdminCommission || value.groupAdminCommission}
                  </>
                )}
              </p>

              {value.groupAdminCommission && (
                <Badge
                  severity="success"
                  value={`+${
                    parseFloat(
                      (value.groupAdminCommission / value.amount).toFixed(2)
                    ) * 100
                  }%`}
                ></Badge>
              )}
              {value.generalAdminCommission &&
                authenticatedUser?.id !== value.userId && (
                  <Badge
                    severity="success"
                    value={`+${
                      parseFloat(
                        (value.generalAdminCommission / value.amount).toFixed(2)
                      ) * 100
                    }%`}
                  ></Badge>
                )}
            </div>
          )}
        />

        <Column header="Creada en" field="createdAt" />
      </DataTable>
    ),
  };

  return (
    <div>
      <div>
        <Calendar
          view="month"
          dateFormat="mm/yy"
          onChange={(e) => setDate(e.value as Date)}
        />
        <Button label="todos" onClick={() => setDate(undefined)} />
      </div>

      {commissionByRole?.[authenticatedUser?.role as Roles] || (
        <DataTable
          header={`Comisiones ${commissionData?.count}`}
          value={commissionData?.commissions}
          emptyMessage="No hay comisiones"
        >
          <Column header="valor transacción" field="amount" />
          <Column header="vendedor" field="userFullname" />
          <Column header="ganancia 10%" field="userCommission" />
          <Column header="nombre de grupo" field="teamName" />
          <Column header="Creada en" field="createdAt" />

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
        </DataTable>
      )}
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
