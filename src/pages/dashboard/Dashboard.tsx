import { Outlet, useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import { Badge } from "primereact/badge";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { useEffect, useMemo } from "react";
import "./styles/dashboard.css";
import GlobalNav from "../../components/GlobalNav";

const roleBasedVisibility = {
  [Roles.sales]: {
    notifications: false,
    users: false,
    collaborators: false,
    forms: true,
    pendingUsers: false,
  },
  [Roles.admin]: {
    notifications: false,
    users: true,
    collaborators: false,
    forms: true,
    pendingUsers: true,
    global: true,
  },
  [Roles.secretary]: {
    notifications: false,
    users: true,
    collaborators: false,
    forms: true,
    pendingUsers: true,
    global: true,
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
  }, [navigate, user]);

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
      icon: "pi pi-user-plus",
      command: () => {
        navigate(ROUTES.DASHBOARD.COLLABORATORS);
      },
    },
    {
      id: "pendingUsers",
      label: "Usuarios pendientes",
      icon: "pi pi-hourglass",
      command: () => {
        navigate(ROUTES.DASHBOARD.PENDING_USERS);
      },
    },
    {
      id: "forms",
      icon: "pi pi-file",
      label: "Formularios",
      command: () => {
        navigate(ROUTES.DASHBOARD.FORMS);
      },
    },
    {
      id: "global",
      icon: "pi pi-globe",
      label: "Global",
      command: () => {
        navigate(ROUTES.DASHBOARD.GLOBAL);
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
    <div className="global-home-grid">
      <GlobalNav items={roleBasedItems} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
