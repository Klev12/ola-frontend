import "./App.css";
import "./pages/home/styles/home-styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ROUTES from "./consts/routes";

import AuthUserFormGuard from "./guard/AuthUserFormGuard";
import AuthAppGuard from "./guard/AuthAppGuard";

import DashBoardRouter from "./routers/DashboardRouter";
import SalesRouter from "./routers/SalesRouter";
import TestsRouter from "./routers/TestsRouter";
import PdfRouter from "./routers/PdfRouter";
import UserFormRouter from "./routers/UserFormRouter";

import { lazy, Suspense } from "react";
4;
import GlobalLoading from "./core/components/GlobalLoading";
import RecoverAccount from "./pages/auth/RecoverAccount";

const Application = lazy(() => import("./layout/Application"));

const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));
const ChangeOwnPassword = lazy(
  () => import("./pages/change-own-password/ChangeOwnPassword")
);

const Payment = lazy(() => import("./pages/sales-form/Payment"));
const WrapperSalesForm = lazy(
  () => import("./pages/sales-form/components/WrapperSalesForm")
);
const Payphonelink = lazy(() => import("./pages/sales-form/Payphonelink"));
const PaymentTransaction = lazy(
  () => import("./pages/sales-form/PaymentTransaction")
);
const GlobalPayment = lazy(() => import("./pages/payment/GlobalPayment"));
const PaypalCapture = lazy(() => import("./pages/payment/PaypalCapture"));

const Training = lazy(() => import("./pages/training/Training"));
const Regulation = lazy(() => import("./pages/regulation/Regulation"));
const PageNotFound = lazy(() => import("./pages/page-not-found/PageNotFound"));
const CheckUserForm = lazy(() => import("./pages/dashboard/CheckUserForm"));
const SalesForm = lazy(() => import("./pages/sales-form/SalesForm"));
const CheckForm = lazy(() => import("./pages/check-form/CheckForm"));
const Home = lazy(() => import("./pages/home/Home"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="" element={<Navigate to={ROUTES.HOME.ME} />} />
          <Route path={ROUTES.PAYMENT.ME} element={<GlobalPayment />} />
          <Route path={ROUTES.PAYPAL.CAPTURE} element={<PaypalCapture />} />
          <Route
            path={ROUTES.PAYPHONE.ME}
            element={<PaymentTransaction />}
          ></Route>
          <Route path={ROUTES.PAYPHONE.LINK} element={<Payphonelink />}></Route>
          <Route
            path=""
            element={
              <AuthAppGuard errorRedirectTo={ROUTES.LOGIN}>
                <AuthUserFormGuard
                  noVerificationRedirectTo={ROUTES.USER_FORM.ME}
                >
                  <Suspense fallback={<GlobalLoading />}>
                    <Application />
                  </Suspense>
                </AuthUserFormGuard>
              </AuthAppGuard>
            }
          >
            <Route path={ROUTES.HOME.ME} element={<Home />} />
            <Route
              path={ROUTES.CHANGE_OWN_PASSWORD.ME}
              element={<ChangeOwnPassword />}
            />
            <Route
              path={ROUTES.DASHBOARD.CHECK_USER_FORM}
              element={<CheckUserForm />}
            />
            <Route path={ROUTES.NOTIFICATIONS.ME} element={<Notifications />} />

            {DashBoardRouter}

            <Route path={ROUTES.BLOG.ME} element={<Blog />} />
            <Route path={ROUTES.REGULATION.ME} element={<Regulation />} />

            {SalesRouter}

            {TestsRouter}

            <Route path={ROUTES.TRAINING.ME} element={<Training />} />
          </Route>

          {UserFormRouter}

          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
          <Route path={ROUTES.SIGNUP} element={<Signup />}></Route>
          <Route path={ROUTES.SIGNUP_CODE} element={<Signup />}></Route>
          <Route path={ROUTES.RECOVER_ACCOUNT} element={<RecoverAccount />} />
          <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />

          <Route
            path={ROUTES.GENERATE_SALES_FORM.ME}
            element={<WrapperSalesForm />}
          >
            <Route
              path={ROUTES.GENERATE_SALES_FORM.ME}
              element={<SalesForm />}
            />
            <Route
              path={ROUTES.GENERATE_SALES_FORM.PAYMENT}
              element={<Payment />}
            />
          </Route>

          <Route path={ROUTES.DASHBOARD.CHECK_FORM} element={<CheckForm />} />

          {PdfRouter}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    </>
  );
}

export default App;
