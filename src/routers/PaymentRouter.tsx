import { Route } from "react-router";
import ROUTES from "../consts/routes";
import { lazy, Suspense } from "react";
import GlobalLoading from "../core/components/GlobalLoading";

const GlobalPayment = lazy(() => import("../pages/payment/GlobalPayment"));
const GlobalInvoice = lazy(() => import("../pages/payment/GlobalInvoice"));

const PaymentRouter = (
  <>
    <Route
      path={ROUTES.PAYMENT.INVOICE()}
      element={
        <Suspense fallback={<GlobalLoading />}>
          <GlobalInvoice />
        </Suspense>
      }
    />
    <Route
      path={ROUTES.PAYMENT.ME}
      element={
        <Suspense fallback={<GlobalLoading />}>
          <GlobalPayment />
        </Suspense>
      }
    ></Route>
  </>
);

export default PaymentRouter;
