import { DataTable } from "primereact/datatable";
import { SalesGetDto } from "../../../models/sales";
import { Column } from "primereact/column";
import ProofList from "../../sales/components/ProofList";
import { Dialog } from "primereact/dialog";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { FormGetDto } from "../../../models/forms";
import { Tag } from "primereact/tag";
import {
  SaleGetDto,
  SalePaymentMethod,
  SalePaymentStatus,
} from "../../../models/sale";
import { statusPayment } from "../../sales/utils/status-payment";
import { Button } from "primereact/button";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { useMutation } from "react-query";
import { setPaymentStatusForm } from "../../../services/forms-service";
import { PrimeIcons } from "primereact/api";
import ROUTES from "../../../consts/routes";
import formatDate from "../../../utils/format-date";

interface SalesTableProps {
  sales: SalesGetDto[];
  confirmPaymentStatusSuccess?: () => void;
}

const SalesTable = ({
  sales,
  confirmPaymentStatusSuccess,
}: SalesTableProps) => {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const [selectedSale, setSelectedSale] = useState<SaleGetDto>();
  const showProofDialog = useToggle();

  const { mutate: setPaymentStatusFormMutate } = useMutation(
    setPaymentStatusForm,
    {
      onSuccess: () => {
        if (confirmPaymentStatusSuccess) confirmPaymentStatusSuccess();
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
    <>
      <DataTable value={sales} emptyMessage="No hay formularios de ventas">
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

        <Column header="Total a pagar" field="saleTotalToPay" />
        <Column
          header="Descuento"
          body={(sale: SaleGetDto) => (
            <>{parseFloat(String(sale.saleDiscount)) * 100}%</>
          )}
        />
        <Column header="Monto pagado" field="saleAmount" />
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
    </>
  );
};

export default SalesTable;
