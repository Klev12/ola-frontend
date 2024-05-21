import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ROUTES from "./consts/routes";
import Home from "./pages/home/Home";
import Notifications from "./pages/home/Notifications";
import Users from "./pages/home/Users";
import { Forms } from "./pages/Form/Form";
import { Contact } from "./pages/home/pages/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import MenuDemo from "./pages/home/components/Menu";

function App() {
  return (
    <>
      <MenuDemo />
      <Routes>
        <Route path="" element={<Navigate to={"/login"}></Navigate>}></Route>
        <Route path={ROUTES.DASHBOARD.ME} element={<Dashboard />}>
          <Route
            path={ROUTES.DASHBOARD.NOTIFICATIONS}
            element={<span>notification</span>}
          />
          <Route path={ROUTES.DASHBOARD.USERS} element={<span>users</span>} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.SIGNUP} element={<Signup />}></Route>
        <Route path={ROUTES.HOME.ME} element={<Home />}>
          <Route
            path=""
            element={<Navigate to={ROUTES.HOME.NOTIFICATIONS} />}
          ></Route>
          <Route
            path={ROUTES.HOME.NOTIFICATIONS}
            element={<Notifications />}
          ></Route>
          <Route path={ROUTES.HOME.USERS} element={<Users />}></Route>
        </Route>
        <Route path={ROUTES.HOME.FORM} element={<Forms></Forms>}></Route>
        <Route path={ROUTES.HOME.CONTACT} element={<Contact></Contact>}></Route>
      </Routes>
    </>
  );
}

export default App;
