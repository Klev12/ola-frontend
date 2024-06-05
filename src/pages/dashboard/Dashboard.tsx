import { Menu } from "primereact/menu";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
const Dashboard = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Notificationes",
      icon: "pi pi-bell",
      command: () => {
        navigate(ROUTES.DASHBOARD.NOTIFICATIONS);
      },
    },
    {
      label: "Usuarios",
      icon: "pi pi-users",
      command: () => {
        navigate(ROUTES.DASHBOARD.USERS);
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

export default Dashboard;
