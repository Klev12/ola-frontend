import { Outlet, useNavigate } from "react-router-dom";
import ROUTES from "../../consts/routes";
import { MenuItem } from "primereact/menuitem";
import { Roles, UserArea } from "../../models/user";
import GlobalNav from "../../components/GlobalNav";
import useMenuRestrictions from "../../hooks/useMenuRestrictions";

enum ItemsIdentifier {
  generateSales = "generateSales",
  mySales = "mySales",
  team = "team",
  commissions = "commissions",
  history = "history",
}

const Sales = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      id: ItemsIdentifier.generateSales,
      label: "Generar ventas",
      icon: "pi pi-list",
      command: () => {
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      id: ItemsIdentifier.mySales,
      label: "Mis ventas",
      icon: "pi pi-shopping-bag",
      command: () => {
        navigate(ROUTES.SALES.DONE_FORMS);
      },
    },
    {
      id: ItemsIdentifier.team,
      label: "Equipo",
      icon: "pi pi-thumbs-up",
      command: () => {
        navigate(ROUTES.SALES.TEAM);
      },
    },

    {
      id: ItemsIdentifier.commissions,
      label: "Comisiones",
      icon: "pi pi-wallet",
      command: () => {
        navigate(ROUTES.SALES.COMMISSIONS);
      },
    },
    {
      id: ItemsIdentifier.history,
      label: "Historial",
      icon: "pi pi-history",
      command: () => {
        navigate(ROUTES.SALES.HISTORY);
      },
    },
  ];

  const roleBasedItems = useMenuRestrictions({
    items,
    restrictions: [
      {
        roles: [Roles.admin, Roles.secretary],
        accessTo: Object.values(ItemsIdentifier),
      },
      {
        roles: [Roles.generalAdmin, Roles.groupAdmin],
        areas: [UserArea.commercial],
        accessTo: Object.values(ItemsIdentifier),
      },
      {
        roles: [Roles.sales, Roles.collaborator],
        accessTo: [
          ItemsIdentifier.generateSales,
          ItemsIdentifier.mySales,
          ItemsIdentifier.history,
        ],
      },
    ],
  });

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
