import { useParams } from "react-router";
import { getTestById } from "../../services/test-service";
import FormPdf from "./components/FormPdf";
import { useQuery } from "react-query";

const TestFormPdf = () => {
  const { id } = useParams();

  const { data: testData, isLoading } = useQuery({
    queryFn: () => getTestById({ id: Number(id) }).then((res) => res.data),
    queryKey: ["user-form-by-user-id", id],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {testData && (
        <FormPdf
          type="test-form"
          test={testData?.test}
          formScheme={testData?.formScheme}
        />
      )}
      {!testData && !isLoading && <div>formulario no encontrado</div>}
    </>
  );
};

export default TestFormPdf;
