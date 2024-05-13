import { Menu } from "primereact/menu";
import "./styles/home-styles.css";
import { MenuItem } from "primereact/menuitem";
import ROUTES from "../../consts/routes";
import { Outlet, useNavigate } from "react-router-dom";
import TemplateDemo from "./components/Menu";

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
  ];

  return (
    <>
      <TemplateDemo />
      <div className="global-home-grid">
        <div
          className="menubar"
          style={{ borderBottom: "1px solid white" }}
        ></div>
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
    </>
  );
};

export default Home;
