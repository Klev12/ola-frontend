import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { getUserFormByUserId } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { useParams } from "react-router";

const CheckUserForm = () => {
  const { id } = useParams();

  const { data: formData } = useQuery({
    queryFn: () => getUserFormByUserId(id as string).then((res) => res.data),
    queryKey: ["form-user", id],
    retry: 1,
  });

  return (
    <div>
      <nav style={{ position: "fixed", zIndex: 2, bottom: 0, right: 0 }}>
        <Button label="Subir cambios" />
        <Button label="Aceptar formulario de ingreso" />
      </nav>
      <PrintForm
        form={formData}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};

export default CheckUserForm;
