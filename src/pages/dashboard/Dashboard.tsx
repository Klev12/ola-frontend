import { Menu } from "primereact/menu";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import { Badge } from "primereact/badge";
import useGlobalState from "../../store/store";
const Dashboard = () => {
  const numberOfNotifications = useGlobalState(
    (state) => state.numberOfNotifications
  );
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Notificationes",
      icon: "pi pi-bell",
      command: () => {
        navigate(ROUTES.DASHBOARD.NOTIFICATIONS);
      },
      template: (item, options) => {
        return (
          <div
            className={options.className}
            onClick={options.onClick}
            style={{ display: "flex", alignItems: "center" }}
          >
            <i className={`${item.icon}`} style={{ marginRight: "0.5em" }}></i>
            {item.label}
            {numberOfNotifications !== 0 && (
              <Badge
                value={numberOfNotifications}
                severity="danger"
                style={{ marginLeft: "0.5em" }}
              />
            )}
          </div>
        );
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
