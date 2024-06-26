import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ROUTES from "./consts/routes";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";

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
import Regulation from "./pages/regulation/Regulation";
import FormPDF from "./pages/form-pdf/FormPDF";
import AuthAppGuard from "./guard/AuthAppGuard";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import AuthUserFormGuard from "./guard/AuthUserFormGuard";
import SignatureDraw from "./pages/signature/Signature";
import Verification from "./pages/user-form/Verification";
import CheckUserForm from "./pages/dashboard/CheckUserForm";
import SalesForm from "./pages/sales-form/SalesForm";
import CheckForm from "./pages/check-form/CheckForm";
import SalesFormPDF from "./pages/form-pdf/SalesFormPDF";

function App() {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <AuthAppGuard errorRedirectTo={ROUTES.LOGIN}>
              <AuthUserFormGuard noVerificationRedirectTo={ROUTES.USER_FORM.ME}>
                <Application />
              </AuthUserFormGuard>
            </AuthAppGuard>
          }
        >
          <Route path={ROUTES.HOME.ME} element={<Home />} />
          <Route
            path={ROUTES.DASHBOARD.CHECK_USER_FORM}
            element={<CheckUserForm />}
          />
          <Route path={ROUTES.DASHBOARD.ME} element={<Dashboard />}>
            <Route
              path={ROUTES.DASHBOARD.NOTIFICATIONS}
              element={<Notifications />}
            />
            <Route path={ROUTES.DASHBOARD.USERS} element={<Users />} />
          </Route>
          <Route path={ROUTES.BLOG.ME} element={<Blog />} />
          <Route path={ROUTES.REGULATION.ME} element={<Regulation />} />
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
          <Route
            path={ROUTES.USER_FORM.SIGNATURE}
            element={<SignatureDraw />}
          />
          <Route
            path={ROUTES.USER_FORM.VERIFICATION}
            element={<Verification />}
          />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.SIGNUP} element={<Signup />}></Route>
        <Route path={ROUTES.SALES.PDF} element={<SalesFormPDF />} />
        <Route path={ROUTES.FORM_PDF.ME} element={<FormPDF />} />
        <Route path={ROUTES.GENERATE_SALES_FORM.ME} element={<SalesForm />} />
        <Route path={ROUTES.DASHBOARD.CHECK_FORM} element={<CheckForm />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
