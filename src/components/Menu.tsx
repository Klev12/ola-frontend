import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import AvatarDemo from "../pages/home/components/Avatar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../consts/routes";
import { Roles } from "../models/user";
import useGlobalState from "../store/store";
import { useMemo } from "react";

import "./styles/menu-styles.css";

const roleBasedVisibility = {
  [Roles.admin]: {
    home: true,
    dashboard: true,
    sales: true,
    blog: true,
    norms: true,
    forms: true,
    tests: true,
  },
  [Roles.secretary]: {
    home: true,
    dashboard: true,
    sales: true,
    blog: true,
    norms: true,
    forms: true,
  },
  [Roles.groupAdmin]: {
    home: true,
    dashboard: true,
    sales: true,
    blog: true,
    norms: true,
    forms: true,
    tests: true,
  },
  [Roles.sales]: {
    home: true,
    dashboard: false,
    sales: true,
    blog: true,
    norms: true,
    forms: true,
  },
  [Roles.user]: {
    home: true,
    dashboard: false,
    sales: false,
    blog: true,
    norms: true,
    forms: true,
  },
};

export default function MenuDemo() {
  const user = useGlobalState((state) => state.user);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: "pi pi-home",
      visible: false,
      command: () => {
        navigate(ROUTES.HOME.ME);
      },
    },
    {
      id: "dashboard",
      label: "Panel de control",
      icon: "pi pi-align-justify",
      visible: false,
      command: () => {
        navigate(ROUTES.DASHBOARD.NOTIFICATIONS);
      },
    },
    {
      id: "sales",
      label: "Ventas",
      icon: "pi pi-money-bill",
      visible: false,
      command: () => {
        console.log(ROUTES.SALES.FORMS);
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      id: "blog",
      label: "Blog",
      icon: "pi pi-bookmark",
      visible: false,
      command: () => {
        navigate(ROUTES.BLOG.ME);
      },
    },
    {
      id: "norms",
      label: "Reglamento Interno",
      icon: "pi pi-book",
      visible: false,
      command: () => {
        navigate(ROUTES.REGULATION.ME);
      },
    },
    {
      id: "tests",
      label: "Pruebas",
      icon: "pi pi-book",
      visible: false,
      command: () => {
        navigate(ROUTES.TESTS.ME);
      },
    },
  ];

  const roleBasedItems = useMemo(() => {
    const roleVisibility = roleBasedVisibility[user?.role as Roles];

    return Object.entries(roleVisibility || []).map(([key, value]) => {
      const indexItem = items.findIndex((item) => item.id === key);
      return {
        ...items[indexItem],
        visible: value,
      };
    });
  }, [user]);

  return (
    <div className="menu">
      <Menubar model={roleBasedItems as MenuItem[]} end={<AvatarDemo />} />
    </div>
  );
}
