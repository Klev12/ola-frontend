import { Navigate } from "react-router";
import useGlobalState from "../store/store";
import { ReactNode } from "react";

interface AuthUserFormGuardProps {
  noVerificationRedirectTo: string;
  children: ReactNode;
}

const AuthUserFormGuard = ({
  noVerificationRedirectTo,
  children,
}: AuthUserFormGuardProps) => {
  const user = useGlobalState((state) => state.user);

  if (user && !user.verified) {
    return <Navigate to={noVerificationRedirectTo} />;
  }

  return children;
};

export default AuthUserFormGuard;
