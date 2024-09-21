import { Outlet, useNavigate } from "react-router";
import GlobalNav from "../../components/GlobalNav";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";

const Tests = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Crear",
      icon: "pi pi-plus",
      command: () => {
        navigate(ROUTES.TESTS.CREATE);
      },
    },
    {
      label: "Resolver",
      icon: "pi pi-check-circle",
      command: () => {
        navigate(ROUTES.TESTS.RESOLVE);
      },
    },
    {
      label: "Revisar",
      icon: "pi pi-eye",
      command: () => {
        navigate(ROUTES.TESTS.CHECK);
      },
    },
  ];

  return (
    <div className="global-home-grid">
      <GlobalNav items={items} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Tests;
