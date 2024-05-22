import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import AvatarDemo from "../pages/home/components/Avatar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../consts/routes";

export default function MenuDemo() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate(ROUTES.HOME.ME);
      },
    },
    {
      label: "Panel de control",
      icon: "pi pi-align-justify",
      command: () => {
        navigate(ROUTES.DASHBOARD.NOTIFICATIONS);
      },
    },
    {
      label: "Ventas",
      icon: "pi pi-money-bill",
      command: () => {
        console.log(ROUTES.SALES.FORMS);
        navigate(ROUTES.SALES.FORMS);
      },
    },
    {
      label: "Blog",
      icon: "pi pi-bookmark",
      command: () => {
        navigate(ROUTES.BLOG.ME);
      },
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Components",
          icon: "pi pi-bolt",
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} end={<AvatarDemo />} />
    </div>
  );
}
