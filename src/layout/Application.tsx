import { Outlet } from "react-router";
import MenuDemo from "../components/Menu";
import "./styles/application.css";

const Application = () => {
  return (
    <div className="application">
      <MenuDemo />
      <Outlet />
    </div>
  );
};

export default Application;
