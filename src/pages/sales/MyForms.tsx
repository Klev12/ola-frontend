import { Button } from "primereact/button";
import { useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import SalesList from "./components/SalesList";
import saleService from "../../services/sale-service";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import CreateSaleMenu from "./components/create-sale-menu/CreateSaleMenu";
import { SaleGetDto, SalePaymentStatus } from "../../models/sale";
import ShowElementList, {
  ShowElementListRef,
} from "../../components/show-element-list/ShowElementList";

const MyForms = () => {
  const showDialog = useToggle();
  const saleList = useRef<ShowElementListRef>(null);

  const [loading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleClick = () => {
    showDialog.setTrue();
  };

  return (
    <div>
      <Toast ref={toast} />

      <Button
        icon="pi pi-plus"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
        label="Crear nuevo formulario"
        raised
      />
      <Dialog
        style={{ minWidth: "30vw" }}
        draggable={false}
        visible={showDialog.value}
        onHide={() => showDialog.setFalse()}
        header="Creación de formulario"
      >
        <CreateSaleMenu
          onSuccessCreated={() => {
            saleList.current?.refetch();
            showDialog.setFalse();
          }}
        />
      </Dialog>
      <ShowElementList
        paginatorPosition="top"
        ref={saleList}
        url={saleService.api.base}
        queryKey="sales-data"
        expanded={true}
        params={{
          ownership: "mine",
          values: {
            paymentStatus: [
              SalePaymentStatus.pending,
              SalePaymentStatus.checking,
            ],
          },
        }}
        allElement={(sales: SaleGetDto[]) => (
          <SalesList
            sales={sales}
            onAfterDelete={() => {
              saleList.current?.refetch();
            }}
            onAferCreatingLink={() => {
              saleList.current?.refetch();
            }}
          />
        )}
      />
    </div>
  );
};

export default MyForms;
