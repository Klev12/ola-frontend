import { useMutation, useQuery } from "react-query";
import { createForm, getMyForms } from "../../services/forms-service";
import { Button } from "primereact/button";
import { useState } from "react";
import FormList from "./components/FormList";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Paginator } from "primereact/paginator";
import PaginatorPage from "../../components/PaginatorPage";

const MyForms = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const { data: formsData, refetch } = useQuery({
    queryFn: () =>
      getMyForms({ page: currentPage + 1, limit: 10 }).then((res) => {
        const forms = res.data.forms.filter(
          (form) => form.form_scheme_id === 1
        );
        return { forms, count: res.data.count };
      }),
    queryKey: ["forms", currentPage],
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
      <PaginatorPage
        limit={10}
        total={formsData?.count}
        onPage={(page) => {
          setCurrentPage(page);
        }}
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
      <FormList forms={formsData?.forms || []} refetchForms={refetch} />
    </div>
  );
};

export default MyForms;
