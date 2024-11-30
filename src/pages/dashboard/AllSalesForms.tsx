import saleService from "../../services/sale-service";
import Filter from "../../components/show-element-list/FilterElement";
import ShowElementList, {
  ShowElementListRef,
} from "../../components/show-element-list/ShowElementList";
import SalesTable from "./components/SalesTable";
import { SalesGetDto } from "../../models/sales";
import { useRef, useState } from "react";
import { SalePaymentStatus } from "../../models/sale";

const AllSalesForms = () => {
  const saleList = useRef<ShowElementListRef>(null);
  const [params, setParams] = useState({});

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
      />
      <ShowElementList
        ref={saleList}
        key={`sales-list-${params}`}
        url={saleService.api.base}
        expanded={true}
        params={{ values: { ...params } }}
        allElement={(elements: SalesGetDto[]) => (
          <SalesTable
            sales={elements}
            confirmPaymentStatusSuccess={() => saleList.current?.refetch()}
          />
        )}
      />
    </div>
  );
};

export default AllSalesForms;
