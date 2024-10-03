import { Tag } from "primereact/tag";
import {
  SaleGetDto,
  SalePaymentMethod,
  SalePaymentStatus,
} from "../../../models/sale";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { PrimeIcons } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router";
import ROUTES from "../../../consts/routes";
import { useMutation, useQuery } from "react-query";
import {
  deleteFormById,
  generateLink,
  invalidateLink,
} from "../../../services/forms-service";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { AxiosError } from "axios";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { getAllTransactions } from "../../../services/transaction-service";
import useToggle from "../../../hooks/useToggle";
import {
  TransactionGetDto,
  TransactionStatus,
} from "../../../models/transaction";
import copyText from "../../../utils/copy-text";
import Timer from "../../../components/Timer";

interface SalesListProps {
  sales: SaleGetDto[];
  onAfterDelete?: () => void;
  onAferCreatingLink?: () => void;
}

const SalesList = ({
  sales,
  onAfterDelete,
  onAferCreatingLink,
}: SalesListProps) => {
  const navigate = useNavigate();

  const [selectedSale, setSelectedSale] = useState<SaleGetDto>();

  const toast = useRef<Toast>(null);

  const showTransactionDialog = useToggle();

  const statusPayment: {
    [key in SalePaymentStatus]: "danger" | "success" | "info" | "warning";
  } = {
    [SalePaymentStatus.cancelled]: "danger",
    [SalePaymentStatus.checking]: "warning",
    [SalePaymentStatus.paid]: "success",
    [SalePaymentStatus.pending]: "info",
  };

  const transactionStatus: {
    [key: number]: { severity: "success" | "info"; details: string };
  } = {
    [TransactionStatus.pending]: {
      severity: "info",
      details: "Pendiente",
    },
    [TransactionStatus.accepted]: {
      severity: "success",
      details: "Aceptado",
    },
  };

  const { mutate: deleteFormByIdMutate, isLoading: isDeletingForm } =
    useMutation(deleteFormById, {
      onSuccess: onAfterDelete,
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error.response?.data.error?.message;

        toast.current?.show({
          summary: "Error",
          severity: "error",
          detail: message,
        });
      },
    });

  const { mutate: generateLinkMutate } = useMutation(generateLink, {
    onSuccess: onAferCreatingLink,
  });
  const { mutate: invalidateLinkMutate } = useMutation(invalidateLink, {
    onSuccess: onAferCreatingLink,
  });

  const { data: transactionsData } = useQuery({
    queryFn: () =>
      getAllTransactions({ formId: selectedSale?.id }).then((res) => res.data),
    queryKey: ["transactions-data", selectedSale?.id],
  });

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <Toast ref={toast} />
      {sales.map((sale) => {
        return (
          <Card title={sale.code} key={sale.id}>
            <div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div>
                  <span>Tipo: </span>
                  <Tag value={sale.contractTitle} />
                </div>
                <div>
                  <span>Formulario completado: </span>
                  <Tag
                    severity={sale.done ? "success" : "danger"}
                    value={sale.done ? "Si" : "No"}
                  />
                </div>
                <div>
                  <span>Estatus de pago: </span>
                  <Tag
                    severity={
                      statusPayment[
                        sale.paymentStatus || SalePaymentStatus.pending
                      ]
                    }
                    value={sale.paymentStatus}
                  />
                </div>
                <div>
                  <span>Método de pago: </span>
                  <Tag severity={"info"} value={sale.paymentMethod} />
                </div>
              </div>
              <div>
                <DataTable
                  style={{ maxWidth: "300px" }}
                  value={[
                    { amount: sale.saleAmount, discount: sale.saleDiscount },
                  ]}
                >
                  <Column header="Monto" field="amount" />
                  <Column
                    header="Descuento %"
                    body={(data) => {
                      return <>{parseFloat(data.discount) * 100}%</>;
                    }}
                  />
                  <Column
                    header="Total"
                    body={(data) => {
                      return (
                        <>
                          {(
                            parseFloat(data.amount) -
                            parseFloat(data.amount) * parseFloat(data.discount)
                          ).toFixed(2)}
                        </>
                      );
                    }}
                  />
                </DataTable>
              </div>
              <div>
                {sale.hash && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Timer
                      expiryTimestamp={new Date(sale.expire_hash_time || "")}
                    />
                    <a
                      target="_blank"
                      href={`${
                        window.location.origin
                      }${ROUTES.GENERATE_SALES_FORM.HASH(sale.hash)}`}
                    >{`${
                      window.location.origin
                    }${ROUTES.GENERATE_SALES_FORM.HASH(sale.hash)}`}</a>
                    <Button
                      icon={PrimeIcons.COPY}
                      onClick={() => {
                        copyText(
                          `${
                            window.location.origin
                          }${ROUTES.GENERATE_SALES_FORM.HASH(sale.hash || "")}`
                        );
                        toast.current?.show({
                          summary: "Link copiado",
                          severity: "success",
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  severity="danger"
                  label="Eliminar"
                  loading={selectedSale?.id === sale.id && isDeletingForm}
                  disabled={
                    (selectedSale?.id === sale.id && isDeletingForm) ||
                    sale.done
                  }
                  onClick={() => {
                    setSelectedSale(sale);
                    confirmDialog({
                      header: "Eliminar",
                      message: "¿Desea eliminar el formulario?",
                      acceptLabel: "Sí",
                      accept: () => {
                        deleteFormByIdMutate(sale.id);
                      },
                    });
                  }}
                />
                {sale.hash ? (
                  <Button
                    severity="danger"
                    label="Eliminar link"
                    onClick={() => {
                      invalidateLinkMutate({ id: sale.id });
                    }}
                  />
                ) : (
                  <Button
                    disabled={sale.done}
                    label="Generar link"
                    onClick={() => {
                      generateLinkMutate({ id: sale.id });
                    }}
                  />
                )}
                <Button
                  label="Formulario"
                  icon={PrimeIcons.EYE}
                  onClick={() => {
                    navigate(ROUTES.SALES.FORM_EDITOR_ID(sale.id));
                  }}
                />
                {[
                  SalePaymentMethod.POS,
                  SalePaymentMethod.transference,
                ].includes(sale.paymentMethod as SalePaymentMethod) && (
                  <Button severity="success" label="Comprobante" />
                )}
                <Button
                  label="Transacciones"
                  onClick={() => {
                    setSelectedSale(sale);
                    showTransactionDialog.setTrue();
                  }}
                />
              </div>
            </div>
          </Card>
        );
      })}
      <Dialog
        header={selectedSale?.code}
        draggable={false}
        visible={showTransactionDialog.value}
        onHide={() => showTransactionDialog.setFalse()}
      >
        <DataTable
          value={transactionsData?.transactions}
          emptyMessage="Todavía no hay transacciones disponibles"
        >
          <Column
            header="Estatus"
            body={(transaction: TransactionGetDto) => (
              <Tag
                severity={transactionStatus[transaction.statusCode].severity}
                value={transactionStatus[transaction.statusCode].details}
              />
            )}
          />
          <Column header="Negocio" field="businessName" />
          <Column
            header="Link"
            body={(transaction: TransactionGetDto) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Button
                  icon={PrimeIcons.COPY}
                  onClick={() => {
                    copyText(
                      `${window.location.origin}${ROUTES.PAYPHONE.LINK_TOKEN(
                        transaction.token
                      )}`
                    );
                    toast.current?.show({
                      severity: "success",
                      summary: "Link copiado",
                    });
                  }}
                />
                <a
                  href={`${window.location.origin}${ROUTES.PAYPHONE.LINK_TOKEN(
                    transaction.token
                  )}`}
                >
                  Ver link
                </a>
              </div>
            )}
          />
          <Column header="Monto" field="amount" />
          <Column header="Creación" field="createdAt" />
        </DataTable>
      </Dialog>
      <ConfirmDialog draggable={false} />
    </div>
  );
};

export default SalesList;
