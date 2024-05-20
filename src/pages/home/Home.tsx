import { Menu } from "primereact/menu";
import "./styles/home-styles.css";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import { Outlet, useNavigate } from "react-router-dom";
import MenuDemo from "./components/Menu";

const Home = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Notificationes",
      icon: "pi pi-plus",
      command: () => {
        navigate(ROUTES.HOME.NOTIFICATIONS);
      },
    },
    {
      label: "Usuarios",
      icon: "pi pi-search",
      command: () => {
        navigate(ROUTES.HOME.USERS);
      },
    },
    {
      label: "Cosas sobre mi",
      icon: "pi pi-prime",
    },
  ];

  return (
    <div>
      <MenuDemo />
      <div className="global-home-grid">
        <Menu
          className="nav"
          onChange={() => {
            console.log("hasd");
          }}
          model={items}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
