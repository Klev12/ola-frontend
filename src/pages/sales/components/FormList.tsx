import { useMutation } from "react-query";
import { generateLink, invalidateLink } from "../../../services/forms-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import useLoading from "../../../hooks/useLoading";
import { FormGetDto } from "../../../models/forms";

interface FormListProps {
  forms: FormGetDto[];
  refetchForms: () => void;
}

const FormList: React.FC<FormListProps> = ({ forms, refetchForms }) => {
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const toast = useRef<Toast>(null);

  const { mutate: generateLinkMutate } = useMutation(generateLink, {
    onSettled: () => {
      setLoadingFalse();
      refetchForms();
      toast.current?.show({
        severity: "success",
        summary: "Link Generado",
        detail: "El link fue creado correctamente",
        life: 1000,
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
        life: 1000,
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
              {form.hash ? (
                <>
                  <h3>Link:</h3>
                  <a href={`http://localhost:8000/generate-forms/${form.hash}`}>
                    http://localhost:8000/generate-forms/{form.hash}
                  </a>
                  <Button
                    icon="pi pi-copy"
                    className="p-button-rounded p-button-info p-mr-2"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `http://localhost:8000/generate-forms/${form.hash}`
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
              </div>
            </Card>
          );
        })}
      </ScrollPanel>
    </div>
  );
};

export default FormList;
