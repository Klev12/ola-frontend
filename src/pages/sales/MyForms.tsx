import { useMutation, useQuery } from "react-query";
import {
  createForm,
  deleteFormById,
  getMyForms,
} from "../../services/forms-service";
import { Button } from "primereact/button";
import { useState } from "react";
import FormList from "./components/FormList";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import PaginatorPage from "../../components/PaginatorPage";
import SalesList from "./components/SalesList";
import saleService from "../../services/sale-service";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import CreateSaleMenu from "./components/CreateSaleMenu";

const MyForms = () => {
  const showDialog = useToggle();

  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const { data: formsData, refetch } = useQuery({
    queryFn: () =>
      saleService.findAll({ page: currentPage + 1 }).then((res) => res.data),
    queryKey: ["forms", currentPage],
  });

  const { mutate: createFormMutate } = useMutation(createForm, {
    onSettled: () => {
      setLoading(false);
      refetch();
      toast.current?.show({
        severity: "success",
        summary: "Formulario creado",
        detail: "El nuevo formulario se ha creado correctamente",
        life: 3000,
      });
    },
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
        style={{
          backgroundColor: "purple",
          border: "0",
          boxShadow: "none",
          marginBottom: "20px",
        }}
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
      {/* <FormList forms={formsData?.forms || []} refetchForms={refetch} /> */}
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
