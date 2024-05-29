import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
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
import UserForm from "./pages/user-form/UserForm";
import Documents from "./pages/user-form/Documents";
import TermsAndConditions from "./pages/user-form/TermsAndConditions";
import Application from "./layout/Application";
import UserFormWrapper from "./layout/UserFormWrapper";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Application />}>
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
        <Route path={ROUTES.USER_FORM.ME} element={<UserFormWrapper />}>
          <Route path={ROUTES.USER_FORM.ME} element={<UserForm />} />
          <Route path={ROUTES.USER_FORM.DOCUMENTS} element={<Documents />} />
          <Route
            path={ROUTES.USER_FORM.TERMS_AND_CONDITIONS}
            element={<TermsAndConditions />}
          />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.SIGNUP} element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
