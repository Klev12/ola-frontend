import saleService from "../../services/sale-service";
import Filter from "./components/Filter";
import ShowElementList, {
  ShowElementListRef,
} from "../../components/show-element-list/ShowElementList";
import SalesTable from "./components/SalesTable";
import { SalesGetDto } from "../../models/sales";
import { useRef } from "react";

const AllSalesForms = () => {
  const saleList = useRef<ShowElementListRef>(null);

  return (
    <div>
      <Filter />
      <ShowElementList
        ref={saleList}
        url={saleService.api.base}
        expanded={true}
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
