import { Navigate, Outlet } from "react-router";
import MenuDemo from "../components/Menu";
import { useQuery } from "react-query";
import { authenticate } from "../services/auth-service";
import ROUTES from "../consts/routes";

const Application = () => {
  const { data: userData, isLoading } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    queryKey: ["user"],
  });

  if (isLoading) {
    return <h1>Autenticando...</h1>;
  }

  if (!userData?.user.verified) {
    return <Navigate to={ROUTES.USER_FORM.ME} />;
  }

  return (
    <div>
      <MenuDemo />
      <Outlet />
    </div>
  );
};

export default Application;
