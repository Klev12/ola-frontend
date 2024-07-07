import { useQuery } from "react-query";
import { authenticate } from "../services/auth-service";
import ROUTES from "../consts/routes";
import { Navigate, Outlet } from "react-router";
import { getUserForm } from "../services/forms-service";
import useGlobalState from "../store/store";

const UserFormWrapper = () => {
  const { data: userData, isLoading } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    queryKey: ["user"],
  });

  const setUserFormNames = useGlobalState((state) => state.setUserFormNames);
  const setUserFormLastNames = useGlobalState(
    (state) => state.setUserFormLastNames
  );
  const setCurrentUserForm = useGlobalState(
    (state) => state.setCurrentUserForm
  );

  const setUserFormId = useGlobalState((state) => state.setUserFormId);

  const setUserIdCard = useGlobalState((state) => state.setUserIdCard);

  useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
    onSuccess: (userFormData) => {
      const formGroupData = userFormData.form_scheme.form_groups.find(
        (formGroup) => formGroup.label == "Mis datos"
      );

      setUserFormNames(
        formGroupData?.fields?.[0]?.results?.[0]?.response?.value as string
      );

      setUserFormLastNames(
        formGroupData?.fields?.[1]?.results?.[0]?.response?.value as string
      );

      setUserIdCard(
        formGroupData?.fields?.[2]?.results?.[0]?.response?.value as string
      );

      setUserFormId(userFormData.user_form.id as number);

      setCurrentUserForm(userFormData);
    },
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (userData?.user.is_form_verified) {
    return <Navigate to={ROUTES.HOME.ME} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserFormWrapper;
