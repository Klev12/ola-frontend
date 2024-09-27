import { Outlet, useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { useEffect } from "react";
import "./styles/dashboard.css";
import GlobalNav from "../../components/GlobalNav";
import useMenuRestrictions from "../../hooks/useMenuRestrictions";

enum ItemIdentifier {
  users = "users",
  collaborator = "collaborators",
  forms = "forms",
  pendingUsers = "pendingUsers",
  teams = "teams",
  global = "global",
}

const Dashboard = () => {
  const user = useGlobalState((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role == Roles.sales) {
      navigate(ROUTES.DASHBOARD.COLLABORATORS);
    }
  }, [navigate, user]);

  const items: MenuItem[] = [
    {
      id: ItemIdentifier.users,
      label: "Usuarios",
      icon: "pi pi-users",
      command: () => {
        navigate(ROUTES.DASHBOARD.USERS);
      },
    },
    {
      id: ItemIdentifier.pendingUsers,
      label: "Usuarios pendientes",
      icon: "pi pi-hourglass",
      command: () => {
        navigate(ROUTES.DASHBOARD.PENDING_USERS);
      },
    },
    {
      id: ItemIdentifier.forms,
      icon: "pi pi-file",
      label: "Formularios",
      command: () => {
        navigate(ROUTES.DASHBOARD.FORMS);
      },
    },
    {
      id: ItemIdentifier.teams,
      icon: "pi pi-thumbs-up",
      label: "Equipos",
      command: () => {
        navigate(ROUTES.DASHBOARD.TEAMS);
      },
    },
    {
      id: ItemIdentifier.global,
      icon: "pi pi-globe",
      label: "Global",
      command: () => {
        navigate(ROUTES.DASHBOARD.GLOBAL);
      },
    },
  ];

  const roleBasedItems = useMenuRestrictions({
    items,
    restrictions: [
      {
        roles: [Roles.admin, Roles.secretary],
        accessTo: Object.values(ItemIdentifier),
      },
    ],
  });

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
