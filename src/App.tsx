import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ROUTES from "./consts/routes";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import MenuDemo from "./components/Menu";
import Blog from "./pages/blog/Blog";
import Sales from "./pages/sales/Sales";
import Notifications from "./pages/dashboard/Notifications";
import Users from "./pages/dashboard/Users";
import MyForms from "./pages/sales/MyForms";
import DoneForms from "./pages/sales/DoneForms";

function App() {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <>
              <MenuDemo />
              <Outlet />
            </>
          }
        >
          <Route path={ROUTES.HOME.ME} element={<Home />} />
          <Route path={ROUTES.DASHBOARD.ME} element={<Dashboard />}>
            <Route
              path={ROUTES.DASHBOARD.NOTIFICATIONS}
              element={<Notifications />}
            />
            <Route path={ROUTES.DASHBOARD.USERS} element={<Users />} />
          </Route>
          <Route path={ROUTES.BLOG.ME} element={<Blog />} />
          <Route path={ROUTES.SALES.ME} element={<Sales />}>
            <Route path={ROUTES.SALES.FORMS} element={<MyForms />} />
            <Route path={ROUTES.SALES.DONE_FORMS} element={<DoneForms />} />
          </Route>
        </Route>

        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.SIGNUP} element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
