import { useMutation, useQuery } from "react-query";
import {
  generateLink,
  getAllForms,
  invalidateLink,
} from "../../../services/forms-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import useLoading from "../../../hooks/useLoading";

const FormList = () => {
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const { data: formsData, refetch } = useQuery({
    queryFn: getAllForms,
  });
  const { mutate: generateLinkMutate } = useMutation(generateLink, {
    onSettled: () => {
      setLoadingFalse();
      refetch();
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
      refetch();
      toast.current?.show({
        severity: "info",
        summary: "Link Invalidado",
        detail: "El link se ha desactivado correctamente",
        life: 1000,
      });
    },
  });

  const toast = useRef<Toast>(null);

  return (
    <div className="p-grid p-justify-center">
      <Toast ref={toast} />
      <ScrollPanel
        style={{ width: "80%", height: "600px", scrollbarColor: "blue" }}
        className="custombar2"
      >
        {formsData?.data.forms.map((form) => {
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
                  style={{ backgroundColor: "purple" }}
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
