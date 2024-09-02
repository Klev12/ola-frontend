import { useQuery } from "react-query";
import FormPdf from "./components/FormPdf";
import { getFormById } from "../../services/forms-service";
import { useParams } from "react-router";

const SalesFormPdf = () => {
  const { id } = useParams();

  const { data: formData, isLoading } = useQuery({
    queryFn: () => getFormById(Number(id)).then((res) => res.data),
    queryKey: ["normal-form-by-id", id],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {formData && (
        <FormPdf
          type="normal-form"
          formInfo={formData?.form}
          formScheme={formData?.form_scheme}
        />
      )}
      {!formData && !isLoading && <div>formulario no encontrado</div>}
    </>
  );
};

export default SalesFormPdf;
