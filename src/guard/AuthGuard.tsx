import { useQuery } from "react-query";
import { Outlet, useLocation, useNavigate } from "react-router";
import { authenticate } from "../services/auth-service";

interface AuthGuardProps {
  onlyHasAccessRedirectTo?: string;
  hasVerifiedRedirectTo?: string;
  errorRedirectTo?: string;
}

const AuthGuard = ({
  onlyHasAccessRedirectTo,
  hasVerifiedRedirectTo,
  errorRedirectTo,
}: AuthGuardProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    onSuccess: (data) => {
      const user = data.user;
      if (user.verified) {
        navigate(hasVerifiedRedirectTo || location.pathname);
        return;
      }
      if (user.has_access) {
        navigate(onlyHasAccessRedirectTo || location.pathname);
      }
    },
    onError: () => {
      navigate(errorRedirectTo || location.pathname);
    },
    queryKey: ["user"],
    retry: 1,
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthGuard;
