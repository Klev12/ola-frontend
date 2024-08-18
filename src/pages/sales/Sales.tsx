import { Outlet, useNavigate } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { MenuItem } from "primereact/menuitem";
import { Roles } from "../../models/user";
import { useMemo } from "react";
import useGlobalState from "../../store/store";
import GlobalNav from "../../components/GlobalNav";

const roleBasedVisibility = {
  [Roles.sales]: {
    generateSales: true,
    mySales: true,
    team: false,
    commissions: true,
    history: true,
  },
  [Roles.admin]: {
    generateSales: true,
    mySales: true,
    team: true,
    commissions: true,
    history: true,
  },
  [Roles.secretary]: {
    generateSales: true,
    mySales: true,
    team: true,
    commissions: true,
    history: true,
  },
  [Roles.groupAdmin]: {
    generateSales: true,
    mySales: true,
    team: true,
    commissions: true,
    history: true,
  },
  [Roles.generalAdmin]: {
    generateSales: true,
    mySales: true,
    team: true,
    commissions: true,
    history: true,
  },
};

const Sales = () => {
  const navigate = useNavigate();
  const autheticatedUser = useGlobalState((state) => state.user);

  const items: MenuItem[] = [
    {
      id: "generateSales",
      label: "Generar ventas",
      icon: "pi pi-list",
      command: () => {
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      id: "mySales",
      label: "Mis ventas",
      icon: "pi pi-thumbs-up",
      command: () => {
        navigate(ROUTES.SALES.DONE_FORMS);
      },
    },
    {
      id: "team",
      label: "Equipo",
      icon: "pi pi-thumbs-up",
      command: () => {
        navigate(ROUTES.SALES.TEAM);
      },
    },

    {
      id: "commissions",
      label: "Comisiones",
      icon: "pi pi-history",
      command: () => {
        navigate(ROUTES.SALES.COMMISSIONS);
      },
    },
    {
      id: "history",
      label: "Historial",
      icon: "pi pi-history",
      command: () => {
        navigate(ROUTES.SALES.HISTORY);
      },
    },
  ];

  const roleBasedItems = useMemo(() => {
    const roleVisibility =
      roleBasedVisibility[autheticatedUser?.role as Roles.sales];
    return Object.entries(roleVisibility || []).map(([key, value]) => {
      const indexItem = items.findIndex((item) => item.id === key);
      return {
        ...items[indexItem],
        visible: value,
      };
    });
  }, [autheticatedUser]);

  return (
    <div>
      <div className="global-home-grid">
        <GlobalNav items={roleBasedItems} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sales;
