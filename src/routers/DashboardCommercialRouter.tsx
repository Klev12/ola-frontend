import { Navigate, Route } from "react-router";
import ROUTES from "../consts/routes";
import { lazy } from "react";

const Commercial = lazy(() => import("../pages/dashboard/Commercial"));
const CommercialTransactions = lazy(
  () => import("../pages/dashboard/commercial/CommercialTransactions")
);
const CommercialCommissions = lazy(
  () => import("../pages/dashboard/commercial/CommercialCommissions")
);
const CommercialSales = lazy(
  () => import("../pages/dashboard/commercial/CommercialSales")
);

const DashboardCommercialRouter = (
  <Route path={ROUTES.DASHBOARD.COMMERCIAL.ME} element={<Commercial />}>
    <Route
      path={ROUTES.DASHBOARD.COMMERCIAL.ME}
      element={<Navigate to={ROUTES.DASHBOARD.COMMERCIAL.SALES} />}
    />
    <Route
      path={ROUTES.DASHBOARD.COMMERCIAL.SALES}
      element={<CommercialSales />}
    />
    <Route
      path={ROUTES.DASHBOARD.COMMERCIAL.TRANSACTIONS}
      element={<CommercialTransactions />}
    />
    <Route
      path={ROUTES.DASHBOARD.COMMERCIAL.COMMISSIONS}
      element={<CommercialCommissions />}
    />
  </Route>
);

export default DashboardCommercialRouter;
