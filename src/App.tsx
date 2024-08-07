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
import Tests from "./pages/tests/Tests";
import EditForm from "./pages/tests/EditForm";
import Collaborators from "./pages/dashboard/Collaborators";
import History from "./pages/sales/History";
import Payment from "./pages/sales-form/Payment";
import WrapperSalesForm from "./pages/sales-form/components/WrapperSalesForm";
import PendingUsers from "./pages/dashboard/PendingUsers";
import Team from "./pages/sales/Team";
import TeamUsers from "./pages/sales/TeamUsers";
import Payphonelink from "./pages/sales-form/Payphonelink";
import PaymentTransaction from "./pages/sales-form/PaymentTransaction";
import UserTeam from "./pages/dashboard/UserTeam";
import UserTransactions from "./pages/sales/UserTransactions";
import Commission from "./pages/sales/Commission";

function App() {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.PAYPHONE.ME}
          element={<PaymentTransaction />}
        ></Route>
        <Route path={ROUTES.PAYPHONE.LINK} element={<Payphonelink />}></Route>
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
            <Route path={ROUTES.DASHBOARD.USER_TEAMS} element={<UserTeam />} />
            <Route
              path={ROUTES.DASHBOARD.NOTIFICATIONS}
              element={<Notifications />}
            />
            <Route path={ROUTES.DASHBOARD.USERS} element={<Users />} />
            <Route
              path={ROUTES.DASHBOARD.COLLABORATORS}
              element={<Collaborators />}
            />
            <Route
              path={ROUTES.DASHBOARD.PENDING_USERS}
              element={<PendingUsers />}
            />
          </Route>
          <Route path={ROUTES.BLOG.ME} element={<Blog />} />
          <Route path={ROUTES.REGULATION.ME} element={<Regulation />} />
          <Route path={ROUTES.SALES.ME} element={<Sales />}>
            <Route path={ROUTES.SALES.FORMS} element={<MyForms />} />
            <Route path={ROUTES.SALES.DONE_FORMS} element={<DoneForms />} />
            <Route path={ROUTES.SALES.HISTORY} element={<History />}></Route>
            <Route path={ROUTES.SALES.TEAM} element={<Team />}>
              <Route path={ROUTES.SALES.TEAM_USERS} element={<TeamUsers />}>
                <Route
                  path={ROUTES.SALES.TRANSACTIONS_USER}
                  element={<UserTransactions />}
                ></Route>
              </Route>
            </Route>
            <Route path={ROUTES.SALES.COMMISSIONS} element={<Commission />} />
          </Route>
          <Route
            path={ROUTES.SALES.FORM_EDITOR}
            element={<WrapperSalesForm hashMode={false} />}
          >
            <Route path={ROUTES.SALES.FORM_EDITOR} element={<SalesForm />} />
            <Route path={ROUTES.SALES.PAYMENT} element={<Payment />} />
          </Route>

          <Route path={ROUTES.TESTS.ME}>
            <Route path={ROUTES.TESTS.ME} element={<Tests />} />
            <Route path={ROUTES.TESTS.EDIT_FORM} element={<EditForm />}></Route>
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
        <Route path={ROUTES.SIGNUP_CODE} element={<Signup />}></Route>

        <Route path={ROUTES.SALES.PDF} element={<SalesFormPDF />} />
        <Route path={ROUTES.FORM_PDF.ME} element={<FormPDF />} />

        <Route
          path={ROUTES.GENERATE_SALES_FORM.ME}
          element={<WrapperSalesForm />}
        >
          <Route path={ROUTES.GENERATE_SALES_FORM.ME} element={<SalesForm />} />
          <Route
            path={ROUTES.GENERATE_SALES_FORM.PAYMENT}
            element={<Payment />}
          />
        </Route>

        <Route path={ROUTES.DASHBOARD.CHECK_FORM} element={<CheckForm />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
