import saleService from "../../services/sale-service";
import Filter from "../../components/show-element-list/FilterElement";
import ShowElementList, {
  ShowElementListRef,
} from "../../components/show-element-list/ShowElementList";
import SalesTable from "./components/SalesTable";
import { SalesGetDto } from "../../models/sales";
import { useRef, useState } from "react";
import { SalePaymentStatus, SaleSummaryGetDto } from "../../models/sale";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { numberMonth } from "../../consts/translations/number-month";
import UserFilter from "../../components/show-element-list/filters/UserFilter";
import TeamFilter from "../../components/show-element-list/filters/TeamFilter";

const AllSalesForms = () => {
  const saleList = useRef<ShowElementListRef>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [params, setParams] = useState<any>({});

  return (
    <div>
      <Filter
        filters={{
          done: {
            placeholder: "Estado de formulario",
            type: "select",
            options: [
              { label: "Todos", value: "no-defined" },
              { label: "Completado", value: "true" },
              { label: "Incompleto", value: "false" },
            ],
          },
          paymentStatus: {
            placeholder: "Estatus de pago",
            type: "select",
            options: [
              { label: "Todos", value: "no-defined" },
              ...Object.entries(SalePaymentStatus)
                .filter(([, value]) => value !== SalePaymentStatus.cancelled)
                .map(([key, value]) => {
                  return {
                    label: key,
                    value,
                  };
                }),
            ],
            arrayValue: true,
          },
        }}
        onFilter={(data) => {
          setParams(data);
        }}
        showOwnershipFilter={false}
        showKeywordSearch={false}
      >
        <UserFilter />
        <TeamFilter />
      </Filter>
      <ShowElementList
      
        emptyElementsMessage="No se encontraron ventas"
        url={saleService.api.summaries}
        expanded={true}
        queryKey={"sale-summaries"}
        params={{ values: { ...params } }}
        eachElement={(
          summary: SaleSummaryGetDto,
          { params: summaryParams }
        ) => {
          return (
            <>
              <h2>
                {numberMonth[summary.month]} {summary.year}
              </h2>
              <DataTable value={[summary]}>
                <Column header="Ventas totales" field="totalCountSales" />

                {params.paymentStatus?.["0"] === SalePaymentStatus.paid &&
                  params.done !== "false" && (
                    <Column header="Monto total" field="totalAmount" />
                  )}
              </DataTable>
              <div style={{ margin: "20px" }}>
                <ShowElementList
                  ref={saleList}
                  queryKey={`sales-list-${summary.month}-${summary.year}`}
                  params={{
                    values: {
                      ...summaryParams?.values,
                      month: summary.month,
                      year: summary.year,
                    },
                  }}
                  url={saleService.api.base}
                  expanded={false}
                  expandButtonMessage="Ver ventas"
                  allElement={(elements: SalesGetDto[]) => (
                    <SalesTable
                      sales={elements}
                      confirmPaymentStatusSuccess={() =>
                        saleList.current?.refetch()
                      }
                    />
                  )}
                />
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default AllSalesForms;
