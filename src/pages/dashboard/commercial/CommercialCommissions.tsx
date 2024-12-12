import { DataTable } from "primereact/datatable";
import ShowElementList from "../../../components/show-element-list/ShowElementList";
import commissionService from "../../../services/commission-service";
import {
  CommissionGetDto,
  SummaryCommissionGetDto,
} from "../../../models/commission";
import { Column } from "primereact/column";
import FilterElement from "../../../components/show-element-list/FilterElement";
import UserFilter from "../../../components/show-element-list/filters/UserFilter";
import { useState } from "react";
import { numberMonth } from "../../../consts/translations/number-month";
import { Tag } from "primereact/tag";
import { TransactionValidity } from "../../../models/done-sale";

const CommercialCommissions = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [params, setParams] = useState<any>({});
  return (
    <div>
      <FilterElement
        showKeywordSearch={false}
        showOwnershipFilter={false}
        filters={{}}
        onFilter={(value) => setParams(value)}
      >
        <UserFilter />
      </FilterElement>
      <ShowElementList
        emptyElementsMessage="No se encontraron comisiones"
        queryKey="commissions-summary-data-global"
        expanded={true}
        url={commissionService.api.summaries}
        params={{ values: { ...params } }}
        eachElement={(commissionSummary: SummaryCommissionGetDto) => (
          <>
            <h2>
              {numberMonth[commissionSummary.month]} {commissionSummary.year}
            </h2>
            <DataTable value={[commissionSummary]}>
              <Column header="Comisiones totales" field="commissionTotal" />
              {params.userId && (
                <Column
                  header="Monto total de comisión de usuario"
                  field="totalAmountUserCommission"
                />
              )}
              {params.userId && (
                <Column
                  header="Monto total de comisión de jefe de grupo"
                  field="totalAmountGroupAdminCommission"
                />
              )}
            </DataTable>
            <div style={{ margin: "20px" }}>
              <ShowElementList
                expandButtonMessage="Ver comisiones"
                url={commissionService.api.base}
                queryKey={`commissions-data-global-${commissionSummary.month}-${commissionSummary.year}`}
                params={{
                  values: {
                    ...params,
                    month: commissionSummary.month,
                    year: commissionSummary.year,
                  },
                }}
                allElement={(commissions: CommissionGetDto[]) => (
                  <DataTable value={commissions}>
                    <Column header="Código de formulario" field="formCode" />
                    <Column
                      header="Vendedor"
                      body={(commission: CommissionGetDto) => (
                        <>
                          <div>{commission.userFullname}</div>
                          <Tag value={commission.userCode} />
                        </>
                      )}
                    />
                    <Column
                      header="Comisión de usuario"
                      field="userCommission"
                    />
                    <Column
                      header="Jefe de grupo"
                      field="groupAdminFullname"
                      body={(commission: CommissionGetDto) => (
                        <>
                          <div>{commission.groupAdminFullname}</div>
                          {commission.teamName && (
                            <Tag value={`Grupo: ${commission.teamName}`} />
                          )}
                        </>
                      )}
                    />
                    <Column
                      header="Comisión de jefe de grupo"
                      field="groupAdminCommission"
                    />
                    <Column
                      header="Validez"
                      body={(commission: CommissionGetDto) => (
                        <Tag
                          severity={
                            commission.validity === TransactionValidity.invalid
                              ? "danger"
                              : "success"
                          }
                          value={
                            commission.validity === TransactionValidity.valid
                              ? "Válido"
                              : "Inválido"
                          }
                        />
                      )}
                    />
                    <Column header="Creado en" field="createdAt" />
                  </DataTable>
                )}
              />
            </div>
          </>
        )}
      />
    </div>
  );
};

export default CommercialCommissions;
