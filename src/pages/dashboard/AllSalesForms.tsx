import { useMutation, useQuery } from "react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FormGetDto } from "../../models/forms";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { PrimeIcons } from "primereact/api";
import formatDate from "../../utils/format-date";
import SearchInput from "../../components/SearchInput";
import PaginatorPage from "../../components/PaginatorPage";
import {
  SaleGetDto,
  SalePaymentMethod,
  SalePaymentStatus,
} from "../../models/sale";
import saleService from "../../services/sale-service";
import { statusPayment } from "../sales/utils/status-payment";
import useToggle from "../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import ProofList from "../sales/components/ProofList";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { setPaymentStatusForm } from "../../services/forms-service";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";

const AllSalesForms = () => {
  const toast = useRef<Toast>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const [selectedSale, setSelectedSale] = useState<SaleGetDto>();
  const showProofDialog = useToggle();

  const { data: salesFormData, refetch: refetchSales } = useQuery({
    queryFn: () =>
      saleService.findAll({ page: currentPage + 1 }).then((res) => res.data),
    queryKey: ["all-sales-form", currentPage, keyword],
  });

  const { mutate: setPaymentStatusFormMutate } = useMutation(
    setPaymentStatusForm,
    {
      onSuccess: () => {
        refetchSales();
        showProofDialog.setFalse();
        toast.current?.show({
          detail: "Estatus de pago actualizado correctamente",
          severity: "success",
        });
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error.response?.data.error?.message;

        showProofDialog.setFalse();
        toast.current?.show({
          detail: message,
          summary: "Error",
          severity: "error",
        });
      },
    }
  );

  return (
    <div>
      <Toast ref={toast} />
      <SearchInput
        placeholder="Código"
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <DataTable
        value={salesFormData?.forms}
        emptyMessage="No hay formularios de ventas"
      >
        <Column header="Código" field="code" />
        <Column header="Tipo" field="contractTitle" />
        <Column
          header="Completado"
          field="done"
          body={(value: FormGetDto) => (
            <Tag
              severity={value.done ? "success" : "info"}
              value={value.done ? "Completado" : "No completo"}
            />
          )}
        />
        <Column header="Creado por" field="userFullname" />
        <Column header="Código" field="userCode" />
        <Column
          header="Estatus de pago"
          body={(value: SaleGetDto) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Tag
                severity={
                  statusPayment[
                    value.paymentStatus || SalePaymentStatus.pending
                  ]
                }
                value={value.paymentStatus}
              />
              {value.paymentStatus === SalePaymentStatus.checking && (
                <Button
                  outlined
                  label="Verificar"
                  onClick={() => {
                    confirmDialog({
                      message:
                        "¿Desea verificar el comprobante?, (esto automáticamente creará las transacciones y comisiones asociadas al monto del formulario)",
                      acceptLabel: "Sí",
                      accept: () => {
                        setPaymentStatusFormMutate({ formId: value.id });
                      },
                    });
                  }}
                />
              )}
            </div>
          )}
        />
        <Column
          header="Tipo de pago"
          body={(sale: SaleGetDto) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div>{sale.paymentMethod}</div>
              {[SalePaymentMethod.POS, SalePaymentMethod.transference].includes(
                sale.paymentMethod as SalePaymentMethod
              ) && (
                <Button
                  severity="success"
                  label="Comprobante"
                  onClick={() => {
                    showProofDialog.setTrue();
                    setSelectedSale(sale);
                  }}
                />
              )}
            </div>
          )}
        />
        <Column header="Monto" field="saleAmount" />
        <Column
          header="Descuento"
          body={(sale: SaleGetDto) => (
            <>{parseFloat(String(sale.saleDiscount)) * 100}%</>
          )}
        />
        <Column
          header="Total"
          body={(sale: SaleGetDto) => (
            <>
              {(
                parseFloat(String(sale.saleAmount)) -
                parseFloat(String(sale.saleAmount)) *
                  parseFloat(String(sale.saleDiscount))
              ).toFixed(2)}
            </>
          )}
        />
        <Column
          header="Revisar"
          body={(value: FormGetDto) => (
            <Button
              outlined
              icon={PrimeIcons.EYE}
              label="Revisar"
              onClick={() => navigate(ROUTES.DASHBOARD.CHECK_FORM_ID(value.id))}
            />
          )}
        />
        <Column
          header="Fecha"
          field="createdAt"
          body={(value: FormGetDto) => <div>{formatDate(value.createdAt)}</div>}
        />
      </DataTable>
      <ConfirmDialog style={{ width: "300px" }} draggable={false} />
      <Dialog
        header={selectedSale?.code}
        className="global-dialog"
        draggable={false}
        visible={showProofDialog.value}
        onHide={() => showProofDialog.setFalse()}
      >
        <ProofList formId={selectedSale?.id} />
      </Dialog>
      <PaginatorPage
        limit={10}
        total={salesFormData?.count}
        onPage={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default AllSalesForms;
