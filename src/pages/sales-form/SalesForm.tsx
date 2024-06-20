import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { generateFormByHash } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { submitFormByHash } from "../../services/result-service";
import { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import MyTimer from "../../components/Timer";
import ClientSignature from "./components/ClientSignature";

const SalesForm = () => {
  const { hash } = useParams();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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

  const { mutate: submitFormByHashMutate, isLoading: isFormLoading } =
    useMutation(submitFormByHash, {
      onSuccess: () => {
        setIsFormSubmitted(true);
      },
    });

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
      {!erroMessage && <MyTimer />}
      <PrintForm
        disableButton={true}
        form={formData}
        onSubmit={(data) => {
          console.log(data);
          submitFormByHashMutate({
            id: data.id,
            hash: hash,
            results: data.results,
          });
        }}
        refetchUser={() => {}}
      >
        <Button
          style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
          loading={isFormLoading}
          disabled={!!erroMessage || isFormSubmitted}
          label="Subir formulario"
          type="submit"
        />
      </PrintForm>
      <ClientSignature hash={hash as string} />
    </div>
  );
};

export default SalesForm;
