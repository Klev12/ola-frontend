import { useMutation, useQuery } from "react-query";
import { createForm, getMyForms } from "../../services/forms-service";
import { Button } from "primereact/button";
import { useState } from "react";
import FormList from "./components/FormList";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Paginator } from "primereact/paginator";

const MyForms = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const { data: formsData, refetch } = useQuery({
    queryFn: () =>
      getMyForms({}).then((res) =>
        res.data.forms.filter((form) => form.form_scheme_id === 1)
      ),
    queryKey: ["forms"],
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
    setLoading(true);
    createFormMutate({ form_scheme_id: 1 });
  };

  return (
    <div>
      <Toast ref={toast} />
      <Paginator
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
        }}
        first={0}
        rows={0}
        totalRecords={100}
        onPageChange={() => {}}
      />
      <Button
        style={{ backgroundColor: "purple", border: "0", boxShadow: "none" }}
        icon="pi pi-plus"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
        label="Crear nuevo formulario"
        raised
      />
      <FormList forms={formsData || []} refetchForms={refetch} />
    </div>
  );
};

export default MyForms;
