import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ROUTES from "./consts/routes";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import Notifications from "./pages/dashboard/Notifications";
import Application from "./layout/Application";
import Regulation from "./pages/regulation/Regulation";
import FormPDF from "./pages/form-pdf/FormPDF";
import AuthAppGuard from "./guard/AuthAppGuard";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import AuthUserFormGuard from "./guard/AuthUserFormGuard";
import CheckUserForm from "./pages/dashboard/CheckUserForm";
import SalesForm from "./pages/sales-form/SalesForm";
import CheckForm from "./pages/check-form/CheckForm";
import SalesFormPDF from "./pages/form-pdf/SalesFormPDF";

import Payment from "./pages/sales-form/Payment";
import WrapperSalesForm from "./pages/sales-form/components/WrapperSalesForm";
import Payphonelink from "./pages/sales-form/Payphonelink";
import PaymentTransaction from "./pages/sales-form/PaymentTransaction";

import Training from "./pages/training/Training";
import DashBoardRouter from "./routers/DashboardRouter";
import SalesRouter from "./routers/SalesRouter";
import TestsRouter from "./routers/TestsRouter";
import PdfRouter from "./routers/PdfRouter";
import UserFormRouter from "./routers/UserFormRouter";
import { Suspense } from "react";
4;
import GlobalLoading from "./core/components/GlobalLoading";
import GlobalPayment from "./pages/payment/GlobalPayment";
import PaypalCapture from "./pages/payment/PaypalCapture";

function App() {
  return (
    <>
      <Suspense fallback={<GlobalLoading />}>
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

          <Route path={ROUTES.SALES.PDF} element={<SalesFormPDF />} />
          <Route path={ROUTES.FORM_PDF.ME} element={<FormPDF />} />

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
      </Suspense>
    </>
  );
}

export default App;
