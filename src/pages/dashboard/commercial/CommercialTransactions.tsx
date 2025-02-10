import { DataTable } from "primereact/datatable";
import ShowElementList, {
  ShowElementListRef,
} from "../../../components/show-element-list/ShowElementList";
import {
  TransactionGetDto,
  TransactionStatus,
  TransactionSummaryGetDto,
} from "../../../models/transaction";
import transactionService from "../../../services/transaction-service";
import { Column } from "primereact/column";
import { numberMonth } from "../../../consts/translations/number-month";
import FilterElement from "../../../components/show-element-list/FilterElement";
import { useRef, useState } from "react";
import TransactionsTable from "./commercial-transaction/TransactionsTable";
import UserFilter from "../../../components/show-element-list/filters/UserFilter";
import TeamFilter from "../../../components/show-element-list/filters/TeamFilter";
import { TransactionValidity } from "../../../models/done-sale";
import SaleFilter from "../../../components/show-element-list/filters/SaleFilter";

const CommercialTransactions = () => {
  const [params, setParams] = useState({});

  const transactionsList = useRef<ShowElementListRef>(null);

  return (
    <div>
      <FilterElement
        showOwnershipFilter={false}
        filters={{
          statusCode: {
            type: "select",
            placeholder: "Código de estatus",
            options: [
              { label: "Todos", value: "no-defined" },
              { label: "Pendiente", value: TransactionStatus.pending },
              { label: "Completado", value: TransactionStatus.accepted },
            ],
          },
          validity: {
            type: "select",
            placeholder: "Validez",
            options: [
              { label: "Todos", value: "no-defined" },
              { label: "Válido", value: TransactionValidity.valid },
              {
                label: "Inválido",
                value: TransactionValidity.invalid,
              },
            ],
          },
        }}
        onFilter={(filter) => {
          setParams({ ...filter });
        }}
      >
        <UserFilter />
        <TeamFilter />
        <SaleFilter />
      </FilterElement>
      <ShowElementList
        queryKey="transactions-global-data"
        params={{ values: { ...params } }}
        expanded={true}
        url={transactionService.api.summaries}
        eachElement={(transactionSummary: TransactionSummaryGetDto) => (
          <>
            <h2 className="subtitle mt-6">
              {numberMonth[transactionSummary.month]} {transactionSummary.year}
            </h2>
            <DataTable value={[transactionSummary]}>
              <Column header="Transacciones totales" field="total" />
              <Column
                header="Total de transacciones pendientes"
                field="totalPending"
              />
              <Column
                header="Total de transacciones completadas"
                field="totalComplete"
              />
              <Column
                header="Monto total de transacciones completadas"
                field="totalCompleteAmount"
              />
            </DataTable>
            <div style={{ margin: "20px" }}>
              <ShowElementList
                ref={transactionsList}
                queryKey={`transactions-${transactionSummary.month}-${transactionSummary.year}`}
                params={{
                  values: {
                    ...params,
                    month: transactionSummary.month,
                    year: transactionSummary.year,
                  },
                }}
                expandButtonMessage="Ver transacciones"
                url={transactionService.api.base}
                allElement={(transactions: TransactionGetDto[]) => (
                  <TransactionsTable
                    transactions={transactions}
                    onSuccessChangeValidity={() => {
                      transactionsList.current?.refetch();
                    }}
                  />
                )}
              />
            </div>
          </>
        )}
      />
    </div>
  );
};

export default CommercialTransactions;
