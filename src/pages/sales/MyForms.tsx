import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { createForm } from "../../services/forms-service";
import { useState } from "react";

const MyForms = () => {
  const [loading, setLoading] = useState(false);

  const { mutate: createFormMutate } = useMutation(createForm, {
    onSuccess: () => {
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
        label="Crear nuevo formulario"
      ></Button>
    </div>
  );
};

export default MyForms;
