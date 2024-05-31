import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { authenticate } from "../services/auth-service";
import useGlobalState from "../store/store";
import { UserGetDto } from "../models/user";
import { ReactNode } from "react";

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
    retry: 2,
  });

  if (isLoading) {
    return <div>autenticando...</div>;
  }

  return children;
};

export default AuthAppGuard;
