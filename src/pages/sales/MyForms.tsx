import { useQuery } from "react-query";
import { Button } from "primereact/button";
import { useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import PaginatorPage from "../../components/PaginatorPage";
import SalesList from "./components/SalesList";
import saleService from "../../services/sale-service";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import CreateSaleMenu from "./components/create-sale-menu/CreateSaleMenu";
import { SalePaymentStatus } from "../../models/sale";

const MyForms = () => {
  const showDialog = useToggle();

  const [loading] = useState(false);
  const toast = useRef<Toast>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const { data: formsData, refetch } = useQuery({
    queryFn: () =>
      saleService
        .findAll({
          page: currentPage + 1,
          paymentStatus: [
            SalePaymentStatus.pending,
            SalePaymentStatus.checking,
          ],
        })
        .then((res) => res.data),
    queryKey: ["forms", currentPage],
    refetchOnWindowFocus: false,
  });

  const handleClick = () => {
    showDialog.setTrue();
  };

  return (
    <div>
      <Toast ref={toast} />
      <PaginatorPage
        limit={10}
        total={formsData?.count}
        onPage={(page) => {
          setCurrentPage(page);
        }}
      />
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
            refetch();
            showDialog.setFalse();
          }}
        />
      </Dialog>

      <SalesList
        sales={formsData?.forms || []}
        onAfterDelete={() => {
          refetch();
        }}
        onAferCreatingLink={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default MyForms;
