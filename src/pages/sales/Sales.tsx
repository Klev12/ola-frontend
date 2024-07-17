import { Menu } from "primereact/menu";
import { Outlet, useNavigate } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { MenuItem } from "primereact/menuitem";

const Sales = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Generar ventas",
      icon: "pi pi-list",
      command: () => {
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      label: "Mis ventas",
      icon: "pi pi-thumbs-up",
      command: () => {
        navigate(ROUTES.SALES.DONE_FORMS);
      },
    },
    {
      label: "Equipo",
      icon: "pi pi-thumbs-up",
      command: () => {
        navigate(ROUTES.SALES.TEAM);
      },
    },
    {
      label: "Historial",
      icon: "pi pi-history",
      command: () => {
        navigate(ROUTES.SALES.HISTORY);
      },
    },
  ];

  return (
    <div>
      <div className="global-home-grid">
        <Menu
          className="nav"
          onChange={() => {
            console.log("hasd");
          }}
          model={items}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sales;
