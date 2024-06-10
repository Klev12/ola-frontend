import { Navigate } from "react-router";
import useGlobalState from "../store/store";
import ROUTES from "../consts/routes";
import { ReactNode } from "react";

interface FormDataGuardProps {
  children: ReactNode;
}

const FormDataGuard = ({ children }: FormDataGuardProps) => {
  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);
  const userIdCard = useGlobalState((state) => state.userIdCard);

  if (!userFormNames || !userFormLastNames || !userIdCard) {
    return <Navigate to={ROUTES.USER_FORM.ME} />;
  }

  return children;
};

export default FormDataGuard;
