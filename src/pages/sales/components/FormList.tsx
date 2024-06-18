import { useMutation } from "react-query";
import {
  deleteFormById,
  generateLink,
  invalidateLink,
  setLinkExpirationTime,
} from "../../../services/forms-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import useLoading from "../../../hooks/useLoading";
import { FormGetDto } from "../../../models/forms";
import ROUTES from "../../../consts/routes";
import { useNavigate } from "react-router";
import { confirmDialog } from "primereact/confirmdialog";

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
  const confirmDelete = () => {
    confirmDialog({
      message: "¿Estás seguro de que quieres eliminar este usuario?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteFormById(forms.id),
      reject: () => {
        toast.current?.show({
          severity: "info",
          summary: "Cancelado",
          detail: "La eliminación del usuario ha sido cancelada",
          life: 4000,
        });
      },
    });
  };

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

  return (
    <div className="p-grid p-justify-center">
      <Toast ref={toast} />
      <ScrollPanel
        style={{ width: "80%", height: "600px", scrollbarColor: "blue" }}
        className="custombar2"
      >
        {forms.map((form) => {
          return (
            <Card
              title={`Formulario N° ${form.id}`}
              subTitle={form.hash ? "Link Generado" : "Link no habilitado"}
              style={{ marginBottom: "2em" }}
              key={form.id}
            >
              <Button
                style={{ backgroundColor: "purple", border: 0 }}
                className="p-button-rounded p-button-success p-mr-2"
                icon="pi pi-times"
                label="Eliminar"
                onClick={() => {
                  deleteFormByIdMutate(form.id);
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
                  style={{ backgroundColor: "purple", border: "0" }}
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
                  style={{ backgroundColor: "purple", border: 0 }}
                  label="Ver formulario"
                  loading={loading}
                  className="p-button-rounded p-mr-2"
                  onClick={() => {
                    navigate(ROUTES.DASHBOARD.CHECK_FORM_ID(form.id));
                  }}
                />
              </div>
            </Card>
          );
        })}
      </ScrollPanel>
    </div>
  );
};

export default FormList;
