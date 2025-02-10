import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import {
  TransactionGetDto,
  TransactionStatus,
  TransactionSummaryGetDto,
} from "../../models/transaction";

import { Button } from "primereact/button";
import copyText from "../../utils/copy-text";
import ROUTES from "../../consts/routes";

import ShowElementList from "../../components/show-element-list/ShowElementList";
import { numberMonth } from "../../consts/translations/number-month";
import transactionService from "../../services/transaction-service";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";

const HistoryTransactions = () => {
  const transactionStatus: {
    [key: number]: { severity: "success" | "info"; details: string };
  } = {
    [TransactionStatus.pending]: {
      severity: "info",
      details: "Pendiente",
    },
    [TransactionStatus.accepted]: {
      severity: "success",
      details: "Aceptado",
    },
  };

  const authenticatedUser = useGlobalState((state) => state.user);

  return (
    <>
      <ShowElementList
        url={transactionService.api.summaries}
        queryKey="transaction-summary"
        expanded={true}
        eachElement={(transactionSummary: TransactionSummaryGetDto) => (
          <>
            <h2 className="subtitle">
              {numberMonth[transactionSummary.month]} {transactionSummary.year}
            </h2>
            <DataTable value={[transactionSummary]}>
              <Column
                header="Número De Transacciones Pendientes"
                field="totalPending"
              />
              <Column
                header="Monto Total De Pendientes"
                field="totalPendingAmount"
              />
              <Column
                header="Número De Transacciones Completas"
                field="totalComplete"
              />
              <Column
                header="Monto Total De Completadas"
                field="totalCompleteAmount"
              />
            </DataTable>
            <div style={{ margin: "20px" }}>
              <ShowElementList
                expandButtonMessage="Ver transacciones"
                url={transactionService.api.base}
                queryKey="transactions"
                params={{
                  ownership:
                    authenticatedUser?.role === Roles.sales
                      ? "mine"
                      : "all-by-team",
                }}
                dateFilter={{
                  month: transactionSummary.month,
                  year: transactionSummary.year,
                }}
                allElement={(elements: TransactionGetDto[]) => (
                  <DataTable value={elements}>
                    <Column header="Código de formulario" field="formCode" />
                    <Column header="Creador" field="userFullname" />
                    <Column header="Grupo" field="teamName" />
                    <Column header="Código" field="userCode" />
                    <Column header="Negocio" field="businessName" />
                    <Column header="Monto" field="amount" />
                    <Column
                      header="Estatus"
                      field="status"
                      body={(value) => {
                        return (
                          <Tag
                            severity={
                              transactionStatus?.[value.statusCode].severity
                            }
                          >
                            {transactionStatus?.[value.statusCode].details}
                          </Tag>
                        );
                      }}
                    />
                    <Column
                      header="Link"
                      body={(value: TransactionGetDto) => (
                        <Button
                          outlined
                          label="copiar"
                          onClick={() => {
                            copyText(
                              `${
                                window.location.host
                              }${ROUTES.PAYPHONE.LINK_TOKEN(value.token)}`
                            );
                          }}
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
    </>
  );
};

export default HistoryTransactions;
