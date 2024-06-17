import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { generateFormByHash } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { submitFormByHash } from "../../services/result-service";
import { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const SalesForm = () => {
  const { hash } = useParams();

  const [erroMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { data: formData, isLoading } = useQuery({
    queryFn: () => generateFormByHash(hash as string).then((res) => res.data),
    queryKey: ["sales"],
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => {
      setErrorMessage("El link ya ha sido usado, por favor usa otro.");
    },
  });

  const { mutate: submitFormByHashMutate } = useMutation(submitFormByHash, {});

  if (isLoading) {
    return (
      <div>
        <ProgressSpinner />
        Cargando formulario...
      </div>
    );
  }

  return (
    <div>
      <h2>{erroMessage && erroMessage}</h2>
      <PrintForm
        disableButton={true}
        form={formData}
        onSubmit={(data) => {
          submitFormByHashMutate({
            id: data.id,
            hash: hash,
            results: data.results,
          });
        }}
      />
    </div>
  );
};

export default SalesForm;
