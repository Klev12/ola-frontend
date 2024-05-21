import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import AvatarDemo from "./Avatar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../consts/routes";

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
      command: () => {
        navigate(ROUTES.DASHBOARD.ME);
      },
    },
    {
      label: "Formularios",
      icon: "pi pi-star",
      url: "/Form",
    },
    {
      label: "Blog",
      icon: "pi pi-bookmark",
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
    {
      label: "Contact",
      icon: "pi pi-envelope",
      url: "/contact",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} end={<AvatarDemo />} />
    </div>
  );
}
