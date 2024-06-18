import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import useLoading from "../../../hooks/useLoading";
import { FormGetDto } from "../../../models/forms";
import ROUTES from "../../../consts/routes";
import { useNavigate } from "react-router";
import {
  deleteFormById,
  generateLink,
  invalidateLink,
  setLinkExpirationTime,
} from "../../../services/forms-service";

import "primeicons/primeicons.css";

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

  const { mutate: generateLinkMutate } = useMutation(generateLink, {
    onSettled: () => {
      setLoadingFalse();
      refetchForms();
      toast.current?.show({
        severity: "success",
        summary: "Link Generado",
        detail: "El link fue creado correctamente",
        life: 4000,
      });
    },
  });

  const { mutate: invalidateLinkMutate } = useMutation(invalidateLink, {
    onSettled: () => {
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

  return (
    <div className="p-grid p-justify-center">
      <Toast ref={toast} />
      <ScrollPanel
        style={{ width: "80%", height: "600px", scrollbarColor: "blue" }}
        className="custombar2"
      >
        {forms.map((form) => (
          <Card
            title={`Formulario N° ${form.id}`}
            subTitle={form.hash ? "Link Generado" : "Link no habilitado"}
            style={{ marginBottom: "2em" }}
            key={form.id}
          >
            <Button
              style={{
                backgroundColor: "purple",
                border: 0,
                boxShadow: "none",
              }}
              className="p-button-rounded p-button-success p-mr-2"
              icon="pi pi-times"
              label="Eliminar"
              onClick={() => {
                setFormToDelete(form);
                setDeleteConfirmationVisible(true);
              }}
            ></Button>
            {form.hash ? (
              <>
                <h3>Link:</h3>
                <a
                  href={ROUTES.GENERATE_SALES_FORM.HASH(form.hash)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {window.location.origin}/generate-sales-form/{form.hash}
                </a>
                <Button
                  icon="pi pi-copy"
                  className="p-button-rounded p-button-info p-mr-2"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/generate-sales-form/${form.hash}`
                    )
                  }
                />
              </>
            ) : (
              <Button
                style={{
                  backgroundColor: "purple",
                  border: "0",
                  boxShadow: "none",
                }}
                label="Generar Link"
                icon="pi pi-link"
                loading={loading}
                className="p-button-rounded p-button-success p-mr-2"
                onClick={() => {
                  setLoadingTrue();
                  generateLinkMutate({ id: form.id });
                  setLinkExpirationTimeMutate({
                    id: form.id,
                    expire_hash_time: Date.now() + 30 * 60 * 1000,
                  });
                }}
              />
            )}
            <div style={{ marginTop: "1em" }}>
              {form.hash && (
                <Button
                  label="Invalidar Link"
                  icon="pi pi-times"
                  loading={loading}
                  className="p-button-rounded p-button-danger p-mr-2"
                  onClick={() => {
                    setLoadingTrue();
                    invalidateLinkMutate({ id: form.id });
                  }}
                />
              )}
              <Button
                style={{
                  backgroundColor: "purple",
                  border: 0,
                  boxShadow: "none",
                }}
                label="Ver formulario"
                loading={loading}
                className="p-button-rounded p-mr-2"
                onClick={() => {
                  navigate(ROUTES.DASHBOARD.CHECK_FORM_ID(form.id));
                }}
              />
            </div>
          </Card>
        ))}
      </ScrollPanel>

      {}
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
    </div>
  );
};

export default FormList;
