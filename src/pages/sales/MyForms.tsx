import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { createForm } from "../../services/forms-service";
import { useState } from "react";
import FormList from "./components/FormList";

const MyForms = () => {
  const [loading, setLoading] = useState(false);

  const { mutate: createFormMutate } = useMutation(createForm, {
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleClick = () => {
    setLoading(true);
    createFormMutate({ form_scheme_id: 1 });
  };

  return (
    <div>
      <Button
        icon="pi pi-plus"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
        label="Crear nuevo formulario"
        raised
      />
      <FormList />
    </div>
  );
};

export default MyForms;
