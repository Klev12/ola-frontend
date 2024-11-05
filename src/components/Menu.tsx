import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import AvatarDemo from "../pages/home/components/Avatar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../consts/routes";
import { Roles, UserArea } from "../models/user";
import useGlobalState from "../store/store";

import NotificationsPanel from "./NotificationsPanel";
import "./styles/global-menu.css";
import useMenuRestrictions from "../hooks/useMenuRestrictions";

enum ItemIdentifier {
  home = "home",
  dashboard = "dashboard",
  sales = "sales",
  training = "training",
  blog = "blog",
  norms = "norms",
  tests = "tests",
}

export default function MenuDemo() {
  const user = useGlobalState((state) => state.user);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      id: ItemIdentifier.home,
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate(ROUTES.HOME.ME);
      },
    },
    {
      id: ItemIdentifier.dashboard,
      label: "Panel de control",
      icon: "pi pi-sliders-v",
      command: () => {
        navigate(ROUTES.DASHBOARD.USERS);
      },
    },
    {
      id: ItemIdentifier.sales,
      label: "Comercial",
      icon: "pi pi-shopping-bag",
      command: () => {
        console.log(ROUTES.SALES.FORMS);
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      id: ItemIdentifier.training,
      label: "Formación",
      icon: "pi pi-face-smile",
      command: () => {
        navigate(ROUTES.TRAINING.ME);
      },
    },
    {
      id: ItemIdentifier.blog,
      label: "Blog",
      icon: "pi pi-bookmark",
      command: () => {
        navigate(ROUTES.BLOG.ME);
      },
    },
    {
      id: ItemIdentifier.norms,
      label: "Reglamento Interno",
      icon: "pi pi-book",
      command: () => {
        navigate(ROUTES.REGULATION.ME);
      },
    },
    {
      id: ItemIdentifier.tests,
      label: "Pruebas",
      icon: "pi pi-clipboard",
      command: () => {
        navigate(ROUTES.TESTS.RESOLVE);
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
      {
        roles: [Roles.groupAdmin, Roles.generalAdmin],
        areas: [UserArea.commercial],
        accessTo: [
          ItemIdentifier.sales,
          ItemIdentifier.norms,
          ItemIdentifier.blog,
          ItemIdentifier.home,
          ItemIdentifier.tests,
          ItemIdentifier.training,
        ],
      },
      {
        roles: [Roles.sales, Roles.collaborator],
        accessTo: [
          ItemIdentifier.sales,
          ItemIdentifier.norms,
          ItemIdentifier.blog,
          ItemIdentifier.home,
          ItemIdentifier.tests,
          ItemIdentifier.training,
        ],
      },
      {
        roles: [Roles.user, Roles.generalAdmin, Roles.groupAdmin],
        areas: Object.values(UserArea).filter(
          (area) => area !== UserArea.commercial
        ),
        accessTo: [
          ItemIdentifier.home,
          ItemIdentifier.norms,
          ItemIdentifier.tests,
          ItemIdentifier.blog,
        ],
      },
      {
        roles: [Roles.user],
        areas: [UserArea.commercial],
        accessTo: [
          ItemIdentifier.home,
          ItemIdentifier.norms,
          ItemIdentifier.tests,
          ItemIdentifier.blog,
        ],
      },
    ],
  });

  return (
    <div className="global-menu">
      <Menubar
        model={roleBasedItems as MenuItem[]}
        end={
          <div style={{ display: "flex", gap: "5px" }}>
            {[Roles.admin, Roles.secretary].includes(user?.role as Roles) && (
              <NotificationsPanel />
            )}
            <AvatarDemo />
          </div>
        }
      />
    </div>
  );
}
