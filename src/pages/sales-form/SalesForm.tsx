import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router";
import PrintForm from "../../components/PrintForm";
import { submitForm, submitFormByHash } from "../../services/result-service";
import { useContext, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";

import ClientSignature from "./components/ClientSignature";
import SelectContractType from "./components/SelectContractType";
import SalesProvider, { SalesContextProps } from "./components/SalesProvider";
import TermsAndConditions from "./components/TermsAndConditions";
import { TermAndConditionsGetDto } from "../../models/term-and-conditions";
import { Camera } from "./components/Camera";
import UploadCards from "./components/UploadCards";
import ROUTES from "../../consts/routes";
import { SalesFormContext } from "./components/WrapperSalesForm";

const SalesForm = () => {
  const { hash } = useParams();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    form: formData,
    isFormLoading: isLoading,
    errorMessage,
    hashMode,
  } = useContext(SalesFormContext);

  const navigate = useNavigate();

  const { mutate: submitFormByHashMutate, isLoading: isFormLoading } =
    useMutation(submitFormByHash, {
      onSuccess: () => {
        setIsFormSubmitted(true);
        navigate(ROUTES.GENERATE_SALES_FORM.PAYMENT_HASH(hash as string));
      },
    });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: () => {
      navigate(ROUTES.SALES.PAYMENT_FORM_ID(formData?.form?.id as number));
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
          <PrintForm
            disableButton={true}
            form={formData}
            footer={
              <>
                {!errorMessage && (
                  <>
                    <SelectContractType formId={formData?.form?.id as number} />
                    <TermsAndConditions
                      termAndConditions={
                        formData?.form
                          ?.term_and_condition as TermAndConditionsGetDto
                      }
                    />
                  </>
                )}
              </>
            }
            onSubmit={(data) => {
              if (!hashMode) {
                submitFormMutate({ id: data.id, results: data.results });
                return;
              }

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
              disabled={!!errorMessage || isFormSubmitted || !isSignatureReady}
              label="Siguiente"
              type="submit"
            />
            {!hashMode && (
              <Button
                type="button"
                label="Ver pdf"
                onClick={() => {
                  navigate(ROUTES.SALES.PDF_ID(Number(formData?.form?.id)));
                }}
              />
            )}
          </PrintForm>
          {!errorMessage && (
            <ClientSignature
              hash={hash as string}
              beforeOnSuccess={() => {
                setIsSignatureReady(true);
              }}
            />
          )}
          <Camera />
          <UploadCards />
        </>
      </SalesProvider>
    </div>
  );
};

export default SalesForm;
