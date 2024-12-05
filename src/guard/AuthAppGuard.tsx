import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { authenticate } from "../services/auth-service";
import useGlobalState from "../store/store";
import { UserGetDto } from "../models/user";
import { ReactNode } from "react";
import GlobalLoading from "../core/components/GlobalLoading";

interface AuthAppGuardProps {
  successRedirectTo?: string;
  errorRedirectTo?: string;
  children: ReactNode;
}

const AuthAppGuard = ({
  successRedirectTo,
  errorRedirectTo,
  children,
}: AuthAppGuardProps) => {
  const navigate = useNavigate();
  const setUser = useGlobalState((state) => state.setUser);
  const { isLoading } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    onSuccess: (data) => {
      setUser(data.user as UserGetDto);
      if (successRedirectTo) {
        navigate(successRedirectTo);
      }
    },
    onError: () => {
      if (errorRedirectTo) {
        navigate(errorRedirectTo);
      }
    },
    queryKey: ["user"],
    retry: 0,
  });

  if (isLoading) {
    return <GlobalLoading message="Autenticando..." />;
  }

  return children;
};

export default AuthAppGuard;
