import { useQuery } from "react-query";
import { authenticate } from "../services/auth-service";
import { useNavigate } from "react-router";
import useGlobalState from "../store/store";
import { UserGetDto } from "../models/user";
import { ReactNode } from "react";

interface AuthUserFormProps {
  redirectWhenVerifyTo: string;
  errorRedirectTo?: string;
  children: ReactNode;
}

const AuthUserFormGuard = ({
  errorRedirectTo,

  children,
}: AuthUserFormProps) => {
  const navigate = useNavigate();
  const setUser = useGlobalState((state) => state.setUser);
  const { data: userData, isLoading } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    onSuccess: () => {
      setUser(userData?.user as UserGetDto);
    },
    onError: () => {
      if (errorRedirectTo) {
        navigate(errorRedirectTo);
      }
    },
    queryKey: ["user"],
    retry: 2,
  });

  return children;
};

export default AuthUserFormGuard;
