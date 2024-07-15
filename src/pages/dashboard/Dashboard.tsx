import { Menu } from "primereact/menu";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import { Badge } from "primereact/badge";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { useEffect, useMemo } from "react";

const roleBasedVisibility = {
  [Roles.sales]: {
    notifications: false,
    users: false,
    collaborators: true,
    pendingUsers: true,
  },
  [Roles.admin]: {
    notifications: true,
    users: true,
    collaborators: true,
    pendingUsers: true,
  },
};

const Dashboard = () => {
  const user = useGlobalState((state) => state.user);

  const numberOfNotifications = useGlobalState(
    (state) => state.numberOfNotifications
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role == Roles.sales) {
      navigate(ROUTES.DASHBOARD.COLLABORATORS);
    }
  }, [user]);

  const items: MenuItem[] = [
    {
      id: "notifications",
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
                style={{
                  marginLeft: "0.5em",
                  backgroundColor: "purple",
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      id: "users",
      label: "Usuarios",
      icon: "pi pi-users",
      command: () => {
        navigate(ROUTES.DASHBOARD.USERS);
      },
    },
    {
      id: "collaborators",
      label: "Colaboradores",
      icon: "pi pi-users",
      command: () => {
        navigate(ROUTES.DASHBOARD.COLLABORATORS);
      },
    },
    {
      id: "pendingUsers",
      label: "Usuarios pendientes",
      icon: "pi pi-users",
      command: () => {
        navigate(ROUTES.DASHBOARD.PENDING_USERS);
      },
    },
  ];

  const roleBasedItems = useMemo(() => {
    const roleVisibility = roleBasedVisibility[user?.role as Roles.sales];
    return Object.entries(roleVisibility || []).map(([key, value]) => {
      const indexItem = items.findIndex((item) => item.id === key);
      return {
        ...items[indexItem],
        visible: value,
      };
    });
  }, [user]);

  return (
    <div>
      <div className="global-home-grid">
        <Menu
          className="nav"
          onChange={() => {
            console.log("hasd");
          }}
          model={roleBasedItems}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
