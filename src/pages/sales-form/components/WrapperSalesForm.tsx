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
  isFormExpire: boolean;
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
  isFormExpire: false,
});

interface WrapperSalesFormProps {
  hashMode?: boolean;
}

const WrapperSalesForm = ({ hashMode = true }: WrapperSalesFormProps) => {
  const { hash } = useParams();
  const { id } = useParams();

  const [isFormExpire, setIsFormExpire] = useState(false);
  const isFormLoading = useToggle(true);

  const navigate = useNavigate();

  const { data: formData, refetch } = useQuery({
    queryFn: () =>
      hashMode
        ? generateFormByHash(hash as string).then((res) => res.data)
        : getFormById(Number(id)).then((res) => res.data),
    queryKey: ["sales-form-data", id || hash],
    retry: 1,
    onError: () => {
      isFormLoading.setFalse();
      setIsFormExpire(true);
    },
    onSuccess: () => {
      isFormLoading.setFalse();
    },
  });

  const { mutate: submitFormMutate } = useMutation(submitForm, {
    onSuccess: () => {
      navigate(ROUTES.SALES.PAYMENT_FORM_ID(formData?.form?.id as number));
    },
    onError: () => {
      setIsFormExpire(true);
    },
  });
  const { mutate: submitFormByHashMutate } = useMutation(submitFormByHash, {
    onSuccess: () => {
      navigate(
        ROUTES.GENERATE_SALES_FORM.PAYMENT_HASH(formData?.form?.hash || "")
      );
    },

    onError: () => {
      setIsFormExpire(true);
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
          isFormExpire,
          isFormLoading: isFormLoading.value,
          toggleLoading: () => {
            isFormLoading.setTrue();
          },
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
