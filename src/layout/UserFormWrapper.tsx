import { useQuery } from "react-query";
import { authenticate } from "../services/auth-service";
import ROUTES from "../consts/routes";
import { Navigate, Outlet } from "react-router";

const UserFormWrapper = () => {
  const { data: userData, isLoading } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    queryKey: ["user"],
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
