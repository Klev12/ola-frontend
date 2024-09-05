import { createContext, useEffect, useState } from "react";
import { FormDetails, FormGetDto } from "../../models/forms";
import { FormScheme } from "../../models/form-scheme";
import { Outlet } from "react-router";
import { useQuery } from "react-query";
import { getUserForm } from "../../services/forms-service";
import useFormDetails from "../../hooks/useFormDetails";
interface UserFormContextProps {
  formInfo?: FormGetDto;
  formScheme?: FormScheme;
  formDetails?: FormDetails;
  setFormDetails: (form: FormDetails) => void;
  isSuccess: boolean;
  isError: boolean;
}

export const UserFormContext = createContext<UserFormContextProps>({
  isSuccess: false,
  isError: false,
  setFormDetails: () => {},
});

const WrapperUserForm = () => {
  const {
    data: formData,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
    queryKey: ["user-form-data"],
    retry: 1,
  });

  const defaultFormDetails = useFormDetails({
    formInfo: formData?.user_form,
    formScheme: formData?.form_scheme,
  });

  const [formDetails, setFormDetails] = useState<FormDetails | undefined>(
    undefined
  );

  useEffect(() => {
    setFormDetails(defaultFormDetails);
  }, [defaultFormDetails]);

  return (
    <UserFormContext.Provider
      value={{
        formInfo: formData?.user_form,
        formScheme: formData?.form_scheme,
        isSuccess,
        isError,
        formDetails,
        setFormDetails(form) {
          setFormDetails(form);
        },
      }}
    >
      <Outlet />
    </UserFormContext.Provider>
  );
};

export default WrapperUserForm;
