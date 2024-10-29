import { useQuery } from "react-query";
import transactionService, {
  getAllTransactions,
} from "../../services/transaction-service";
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
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import PaginatorPage from "../../components/PaginatorPage";
import ShowElementList from "../../components/show-element-list/ShowElementList";
import { numberMonth } from "../../consts/translations/number-month";

const HistoryTransactions = () => {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>();

  const { data: transactionData } = useQuery({
    queryFn: () =>
      getAllTransactions({
        page,
        month: date?.getMonth() ? date.getMonth() + 1 : undefined,
      }).then((res) => res.data),
    retry: 1,
    queryKey: ["transactions-history", date?.getMonth(), page],
  });

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

  return (
    <>
      <ShowElementList
        url={transactionService.api.summaries}
        expanded={true}
        eachElement={(transactionSummary: TransactionSummaryGetDto) => (
          <>
            <h2>
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
                params={{ ownership: "all-by-team" }}
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
      {/* <div>
        <Calendar
          view="month"
          dateFormat="mm/yy"
          onChange={(e) => setDate(e.value as Date)}
        />
        <Button label="todos" onClick={() => setDate(undefined)} />
      </div>
      <DataTable value={transactionData?.transactions}>
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
              <Tag severity={transactionStatus?.[value.statusCode].severity}>
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
                  `${window.location.host}${ROUTES.PAYPHONE.LINK_TOKEN(
                    value.token
                  )}`
                );
              }}
            />
          )}
        />
        <Column header="Creado en" field="createdAt" />
      </DataTable>
      <PaginatorPage
        limit={10}
        total={transactionData?.count}
        onPage={(page) => {
          setPage(page + 1);
        }}
      /> */}
    </>
  );
};

export default HistoryTransactions;
