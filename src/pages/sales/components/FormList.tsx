import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import useLoading from "../../../hooks/useLoading";
import { FormGetDto } from "../../../models/forms";
import ROUTES from "../../../consts/routes";
import { useNavigate } from "react-router";
import {
  deleteFormById,
  invalidateLink,
  setLinkExpirationTime,
} from "../../../services/forms-service";

import "primeicons/primeicons.css";
import TransactionsList from "./TransactionsList";
import useToggle from "../../../hooks/useToggle";
import PaymentDataForm from "./PaymentDataForm";

interface FormListProps {
  forms: FormGetDto[];
  refetchForms: () => void;
}

const FormList: React.FC<FormListProps> = ({ forms, refetchForms }) => {
  const { mutate: deleteFormByIdMutate } = useMutation(deleteFormById, {
    onSuccess: () => {
      refetchForms();
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Se ha eliminado correctamente.",
        life: 4000,
      });
    },
  });

  const navigate = useNavigate();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const toast = useRef<Toast>(null);

  const { mutate: setLinkExpirationTimeMutate } = useMutation(
    setLinkExpirationTime
  );

  const { mutate: invalidateLinkMutate } = useMutation(invalidateLink, {
    onSuccess: () => {
      setLoadingFalse();
      refetchForms();
      toast.current?.show({
        severity: "info",
        summary: "Link Invalidado",
        detail: "El link se ha desactivado correctamente",
        life: 4000,
      });
    },
  });

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [formToDelete, setFormToDelete] = useState<FormGetDto | null>(null);

  const showPaymentDialog = useToggle();

  const [selectedForm, setSelectedForm] = useState<FormGetDto | undefined>(
    undefined
  );

  return (
    <div className="p-grid p-justify-center">
      <Toast ref={toast} />

      {forms.map((form, index) => (
        <Card
          title={`Formulario N° ${forms.length - index}: ${form.code}`}
          subTitle={
            <div>
              <p>{form.hash ? "Link Generado" : "Link no habilitado"}</p>
              <p>{form.block ? "formulario bloqueado" : ""}</p>
            </div>
          }
          style={{ marginBottom: "2em" }}
          key={form.id}
        >
          {form.hash && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ padding: 0, margin: 0 }}>Link:</h3>
              <a
                style={{ margin: "10px 0", marginRight: "10px" }}
                href={ROUTES.GENERATE_SALES_FORM.HASH(form.hash)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {window.location.origin}/generate-sales-form/{form.hash}
              </a>

              <Button
                disabled={form.block}
                icon="pi pi-copy"
                className="p-button-rounded p-button-info p-mr-2"
                onClick={() => {
                  const textToCopy = `${window.location.origin}/generate-sales-form/${form.hash}`;

                  // Create a temporary textarea element
                  const textarea = document.createElement("textarea");
                  textarea.value = textToCopy;
                  textarea.setAttribute("readonly", "");
                  textarea.style.position = "absolute";
                  textarea.style.left = "-9999px"; // Move outside the screen to make it invisible

                  document.body.appendChild(textarea);
                  textarea.select();

                  // Execute copy command
                  document.execCommand("copy");

                  // Clean up - remove the textarea from the DOM
                  document.body.removeChild(textarea);
                  toast.current?.show({
                    severity: "success",
                    summary: "Link Copiado",
                    detail: "El link ha sido copiado al portapapeles.",
                    life: 3000,
                  });
                }}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <div>
              <Button
                disabled={form.block}
                style={{
                  backgroundColor: "red",
                  border: 0,
                  boxShadow: "none",
                  margin: "10px",
                }}
                className="p-button-rounded p-button-success p-mr-2"
                icon="pi pi-trash"
                label="Eliminar"
                onClick={() => {
                  setFormToDelete(form);
                  setDeleteConfirmationVisible(true);
                }}
              ></Button>
              {!form.hash && (
                <Button
                  disabled={form.block}
                  style={{
                    backgroundColor: "purple",
                    border: "0",
                    boxShadow: "none",
                    margin: "10px",
                  }}
                  label="Generar Link"
                  icon="pi pi-link"
                  loading={loading}
                  className="p-button-rounded p-button-success p-mr-2"
                  onClick={() => {
                    showPaymentDialog.setTrue();
                    setSelectedForm(form);
                  }}
                />
              )}
              {form.hash && (
                <Button
                  disabled={form.block}
                  label="Invalidar Link"
                  icon="pi pi-times"
                  loading={loading}
                  className="p-button-rounded p-button-danger"
                  onClick={() => {
                    setLoadingTrue();
                    invalidateLinkMutate({ id: form.id as number });
                  }}
                  style={{ margin: "10px" }}
                />
              )}
            </div>
            <div>
              <Button
                disabled={form.block}
                style={{
                  backgroundColor: "purple",
                  border: 0,
                  boxShadow: "none",
                  margin: "10px",
                }}
                label="Formulario"
                icon="pi pi-file"
                loading={loading}
                className="p-button-rounded"
                onClick={() => {
                  navigate(ROUTES.SALES.FORM_EDITOR_ID(Number(form.id)));
                }}
              />
              <TransactionsList form={form} transactions={form.transactions} />
            </div>
          </div>
        </Card>
      ))}

      <Dialog
        draggable={false}
        visible={deleteConfirmationVisible}
        onHide={() => setDeleteConfirmationVisible(false)}
        header="Confirmación de Eliminación"
        footer={
          <div>
            <Button
              style={{ color: "purple" }}
              label="Cancelar"
              onClick={() => setDeleteConfirmationVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Eliminar"
              onClick={() => {
                if (formToDelete) {
                  deleteFormByIdMutate(formToDelete.id);
                }
                setDeleteConfirmationVisible(false);
              }}
              className="p-button-danger"
            />
          </div>
        }
      >
        ¿Estás seguro que deseas eliminar este formulario?
      </Dialog>

      <Dialog
        header={"Datos de pago " + selectedForm?.code}
        visible={showPaymentDialog.value}
        onHide={() => showPaymentDialog.setFalse()}
      >
        <PaymentDataForm
          payment={selectedForm?.payment}
          formId={selectedForm?.id as number}
          onSuccess={() => {
            setLoadingTrue();
            setLinkExpirationTimeMutate({
              id: selectedForm?.id as number,
              expire_hash_time:
                (() => {
                  const date = new Date();
                  date.setMinutes(date.getUTCMinutes() + 40);

                  return date;
                })().getTime() +
                46 * 60 * 36000,
            });
            showPaymentDialog.setFalse();
          }}
        />
      </Dialog>
    </div>
  );
};

export default FormList;
