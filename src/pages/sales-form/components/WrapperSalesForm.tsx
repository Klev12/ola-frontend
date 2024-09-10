import { createContext, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import {
  generateFormByHash,
  getFormById,
} from "../../../services/forms-service";
import { FormDetails, FormGetDto } from "../../../models/forms";
import { FormScheme } from "../../../models/form-scheme";
import { submitForm, submitFormByHash } from "../../../services/result-service";
import { AllResultPutDto } from "../../../models/result";
import useToggle from "../../../hooks/useToggle";
import ROUTES from "../../../consts/routes";

interface SalesFormContextProps {
  formInfo?: FormGetDto;
  formScheme?: FormScheme;
  formDetails?: FormDetails;
  setFormDetails: (form: FormDetails) => void;
  isFormLoading?: boolean;
  toggleLoading: () => void;
  errorMessage?: string;
  hashMode?: boolean;
  hash?: string;
  submit: (data: AllResultPutDto) => void;
  submitByHash: (data: AllResultPutDto) => void;
  refetchForm: () => void;
}

export const SalesFormContext = createContext<SalesFormContextProps>({
  formInfo: undefined,
  isFormLoading: undefined,
  hashMode: true,
  toggleLoading: () => {},
  setFormDetails: () => {},
  submit: () => {},
  submitByHash: () => {},
  refetchForm: () => {},
});

interface WrapperSalesFormProps {
  hashMode?: boolean;
}

const WrapperSalesForm = ({ hashMode = true }: WrapperSalesFormProps) => {
  const { hash } = useParams();
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const isFormLoading = useToggle();

  const navigate = useNavigate();

  const {
    data: formData,

    refetch,
  } = useQuery({
    queryFn: () =>
      hashMode
        ? generateFormByHash(hash as string).then((res) => res.data)
        : getFormById(Number(id)).then((res) => res.data),
    queryKey: ["sales-form-data", id || hash],
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => {
      setErrorMessage("El link ya ha sido usado, por favor usa otro.");
      isFormLoading.setFalse();
    },
    onSuccess: () => {
      isFormLoading.setFalse();
    },
  });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: () => {
      navigate(ROUTES.SALES.PAYMENT_FORM_ID(formData?.form?.id as number));
    },
  });
  const { mutate: submitFormByHashMutate } = useMutation(submitFormByHash, {
    onSuccess: () => {
      navigate(ROUTES.SALES.PAYMENT_FORM_ID(formData?.form?.id as number));
    },
  });

  const [formDetails, setFormDetails] = useState<FormDetails | undefined>(
    undefined
  );

  return (
    <div>
      <SalesFormContext.Provider
        value={{
          formInfo: formData?.form,
          formScheme: formData?.form_scheme,
          formDetails,
          isFormLoading: isFormLoading.value,
          toggleLoading: () => {
            isFormLoading.setTrue();
          },
          errorMessage,
          hashMode,
          setFormDetails: (form) => {
            setFormDetails(form);
          },
          submit: submitFormMutate,
          submitByHash: submitFormByHashMutate,
          hash,
          refetchForm: () => {
            refetch();
          },
        }}
      >
        <Outlet />
      </SalesFormContext.Provider>
    </div>
  );
};

export default WrapperSalesForm;
