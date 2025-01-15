import { DataTable } from "primereact/datatable";
import { SalesGetDto } from "../../../models/sales";
import { Column } from "primereact/column";
import ProofList from "../../sales/components/ProofList";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
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

import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { useMutation } from "react-query";
import { setPaymentStatusForm } from "../../../services/forms-service";

import ROUTES from "../../../consts/routes";
import formatDate from "../../../utils/format-date";
import { Link } from "react-router-dom";
import { ServiceType } from "../../../models/service";
import { PrimeIcons } from "primereact/api";
import useGlobalState from "../../../store/store";
import { Roles } from "../../../models/user";
import saleService from "../../../services/sale-service";

interface SalesTableProps {
  sales: SalesGetDto[];
  confirmPaymentStatusSuccess?: () => void;
  onAfterDelete?: () => void;
}

const SalesTable = ({
  sales,
  confirmPaymentStatusSuccess,
  onAfterDelete,
}: SalesTableProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const toast = useRef<Toast>(null);

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

  const { mutate: deleteById, isLoading: isDeleting } = useMutation(
    saleService.markAsDeleted,
    {
      onSuccess: onAfterDelete,
    }
  );

  return (
    <>
      <Toast ref={toast} />
      <DataTable value={sales} emptyMessage="No hay formularios de ventas">
        {authenticatedUser?.role === Roles.admin && (
          <Column
            header=""
            body={(sale: SaleGetDto) => (
              <Button
                severity="danger"
                loading={isDeleting}
                disabled={isDeleting}
                rounded
                icon={PrimeIcons.TRASH}
                onClick={() => {
                  confirmDialog({
                    header: sale.code,
                    acceptLabel: "Aceptar",
                    message: `¿Desea eliminar la venta?`,
                    accept: () => {
                      deleteById({ saleId: sale.id });
                    },
                  });
                }}
              />
            )}
          />
        )}
        <Column header="Código" field="code" />
        <Column header="Tipo" field="contractTag" />
        <Column
          header="Servicios"
          body={(sale: SaleGetDto) => (
            <>
              {sale.serviceTitle && (
                <>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Servicio:</span>{" "}
                    {sale.serviceTitle}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      {sale.serviceType === ServiceType.normal
                        ? "Subservicio: "
                        : "Plan: "}
                    </span>
                    {sale.serviceOptionTitle}
                  </div>
                </>
              )}
            </>
          )}
        />
        <Column header="Capacitación" field="courseTitle" />
        <Column
          header="Cliente"
          body={(sale: SaleGetDto) => (
            <>
              <div>
                <span className="--bold">Nombre: </span>
                <small>{sale.customerName}</small>
              </div>
              <div>
                <span className="--bold">Negocio: </span>
                <small>{sale.businessName}</small>
              </div>
            </>
          )}
        />
        <Column
          header="Hecho"
          field="done"
          body={(value: FormGetDto) => (
            <Button
              size="small"
              rounded
              severity={value.done ? "success" : "info"}
              icon={value.done ? PrimeIcons.CHECK : PrimeIcons.TIMES}
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
              {[
                SalePaymentMethod.POS,
                SalePaymentMethod.transference,
                SalePaymentMethod.cheque,
              ].includes(sale.paymentMethod as SalePaymentMethod) && (
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
            <>
              <Link
                to={`${window.location.origin}${ROUTES.DASHBOARD.CHECK_FORM_ID(
                  value.id
                )}`}
              >
                Revisar
              </Link>
            </>
          )}
        />
        <Column
          header="Fecha"
          field="createdAt"
          body={(value: FormGetDto) => <div>{formatDate(value.createdAt)}</div>}
        />
      </DataTable>

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
