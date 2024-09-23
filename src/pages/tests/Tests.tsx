import { Outlet, useNavigate } from "react-router";
import GlobalNav from "../../components/GlobalNav";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import useMenuRestrictions from "../../hooks/useMenuRestrictions";
import { Roles } from "../../models/user";

enum ItemsIdentifier {
  create = "create",
  resolve = "resolve",
  check = "check",
}

const Tests = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      id: ItemsIdentifier.resolve,
      label: "Resolver",
      icon: "pi pi-check-circle",
      command: () => {
        navigate(ROUTES.TESTS.RESOLVE);
      },
    },
    {
      id: ItemsIdentifier.create,
      label: "Crear",
      icon: "pi pi-plus",
      command: () => {
        navigate(ROUTES.TESTS.CREATE);
      },
    },
    {
      id: ItemsIdentifier.check,
      label: "Revisar",
      icon: "pi pi-eye",
      command: () => {
        navigate(ROUTES.TESTS.CHECK);
      },
    },
  ];

  const restrictedItems = useMenuRestrictions({
    items,
    restrictions: [
      {
        roles: [
          Roles.admin,
          Roles.secretary,
          Roles.generalAdmin,
          Roles.groupAdmin,
        ],
        accessTo: Object.values(ItemsIdentifier),
      },
      {
        roles: [Roles.user, Roles.sales],
        accessTo: [ItemsIdentifier.resolve],
      },
    ],
  });

  return (
    <div className="global-home-grid">
      <GlobalNav items={restrictedItems} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Tests;
