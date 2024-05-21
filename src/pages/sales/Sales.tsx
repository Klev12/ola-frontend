import { Menu } from "primereact/menu";
import { Outlet, useNavigate } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { MenuItem } from "primereact/menuitem";

const Sales = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Mis formularios",
      icon: "pi pi-plus",
      command: () => {
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      label: "hechos",
      icon: "pi pi-search",
      command: () => {
        navigate(ROUTES.SALES.DONE_FORMS);
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
