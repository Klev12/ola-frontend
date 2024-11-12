import { Outlet } from "react-router";
import MenuDemo from "../components/Menu";
import "./styles/application.css";
import { Suspense } from "react";
import GlobalLoading from "../core/components/GlobalLoading";

const Application = () => {
  return (
    <div className="application">
      <MenuDemo />
      <Suspense fallback={<GlobalLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Application;
