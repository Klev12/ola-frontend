import { useMutation } from "react-query";
import { submitForm } from "../../services/result-service";
import { Navigate, useNavigate } from "react-router-dom";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import { useContext } from "react";
import { UserFormContext } from "./WrapperUserForm";
import ROUTES from "../../consts/routes";

const UserForm = () => {
  const navigate = useNavigate();
  const { formInfo, formScheme, setFormDetails } = useContext(UserFormContext);

  const { mutate: submitFormMutate, isLoading } = useMutation(submitForm, {
    onSuccess: () => {
      navigate(ROUTES.USER_FORM.TERMS_AND_CONDITIONS);
    },
  });

  if (formInfo?.done) {
    return <Navigate to={ROUTES.USER_FORM.TERMS_AND_CONDITIONS} />;
  }

  return (
    <>
      <GlobalPrintForm
        formInfo={formInfo}
        formScheme={formScheme}
        onSubmit={(results) => {
          submitFormMutate({ id: formInfo?.id as number, results });
        }}
        editMode={!!formInfo?.done}
        showHeader={false}
        onChangeDetails={(form) => {
          setFormDetails(form);
        }}
        loading={isLoading}
      />
    </>
  );
};

export default UserForm;
