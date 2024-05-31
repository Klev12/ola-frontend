import { Outlet } from "react-router";
import MenuDemo from "../components/Menu";

const Application = () => {
  return (
    <div>
      <MenuDemo />
      <Outlet />
    </div>
  );
};

export default Application;
