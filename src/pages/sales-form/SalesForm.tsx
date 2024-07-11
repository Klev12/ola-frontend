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
import SelectContractType from "./components/SelectContractType";
import SalesProvider, { SalesContextProps } from "./components/SalesProvider";
import TermsAndConditions from "./components/TermsAndConditions";
import { TermAndConditionsGetDto } from "../../models/term-and-conditions";
import { Camera } from "./components/Camera";
import UploadCards from "./components/UploadCards";
import Signature from "../form-pdf/components/Signature";

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

  const [isSignatureReady, setIsSignatureReady] = useState(false);

  const [formDataValues, setFormDataValues] = useState<
    SalesContextProps | undefined
  >(undefined);

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
      <SalesProvider formData={formDataValues?.formData}>
        <>
          <h2>{erroMessage && erroMessage}</h2>
          {!erroMessage && <MyTimer />}
          <PrintForm
            footer={
              <>
                {!erroMessage && (
                  <>
                    <SelectContractType formId={formData?.form?.id as number} />
                    <TermsAndConditions
                      termAndConditions={
                        formData?.form
                          ?.term_and_condition as TermAndConditionsGetDto
                      }
                    />
                    <Camera />
                    <UploadCards />
                  </>
                )}
              </>
            }
            disableButton={true}
            form={formData}
            onSubmit={(data) => {
              console.log(data.results);
              submitFormByHashMutate({
                id: data.id,
                hash: hash,
                results: data.results,
              });

              setFormDataValues({
                formData: {
                  id: data.id as number,
                  hash: hash as string,
                  results: data.results,
                },
              });
            }}
            refetchUser={() => {}}
          >
            <Button
              style={{
                backgroundColor: "purple",
                border: 0,
                boxShadow: "none",
              }}
              loading={isFormLoading}
              disabled={!!erroMessage || isFormSubmitted || !isSignatureReady}
              label="Siguiente"
              type="submit"
            />
          </PrintForm>
          {!erroMessage && (
            <ClientSignature
              hash={hash as string}
              beforeOnSuccess={() => {
                setIsSignatureReady(true);
              }}
            />
          )}
        </>
      </SalesProvider>
    </div>
  );
};

export default SalesForm;
