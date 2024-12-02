import { Navigate, Route } from "react-router";
import ROUTES from "../consts/routes";
import { lazy } from "react";

const Sales = lazy(() => import("../pages/sales/Sales"));
const MyForms = lazy(() => import("../pages/sales/MyForms"));
const DoneForms = lazy(() => import("../pages/sales/DoneForms"));
const History = lazy(() => import("../pages/sales/History"));
const HistorySales = lazy(() => import("../pages/sales/HistorySales"));
const HistoryCommissions = lazy(
  () => import("../pages/sales/HistoryCommissions")
);
const HistoryTransactions = lazy(
  () => import("../pages/sales/HistoryTransactions")
);
const WrapperSalesForm = lazy(
  () => import("../pages/sales-form/components/WrapperSalesForm")
);
const Payment = lazy(() => import("../pages/sales-form/Payment"));
const SalesForm = lazy(() => import("../pages/sales-form/SalesForm"));
const Commission = lazy(() => import("../pages/sales/Commission"));
const UserTransactions = lazy(() => import("../pages/sales/UserTransactions"));
const TeamUsers = lazy(() => import("../pages/sales/TeamUsers"));
const Team = lazy(() => import("../pages/sales/Team"));

const SalesRouter = (
  <Route path={ROUTES.SALES.ME} element={<Sales />}>
    <Route path={ROUTES.SALES.FORMS} element={<MyForms />} />
    <Route
      path={ROUTES.SALES.DONE_FORMS}
      element={<DoneForms lastMonth={true} />}
    />
    <Route path={ROUTES.SALES.HISTORY} element={<History />}>
      <Route
        path={ROUTES.SALES.HISTORY}
        element={<Navigate to={ROUTES.SALES.HISTORY_TRANSACTIONS} />}
      />
      <Route
        path={ROUTES.SALES.HISTORY_TRANSACTIONS}
        element={<HistoryTransactions />}
      />
      <Route
        path={ROUTES.SALES.HISTORY_COMMISSIONS}
        element={<HistoryCommissions />}
      />
      <Route path={ROUTES.SALES.HISTORY_SALES} element={<HistorySales />} />
    </Route>
    <Route path={ROUTES.SALES.TEAM} element={<Team />}>
      <Route path={ROUTES.SALES.TEAM_USERS} element={<TeamUsers />}>
        <Route
          path={ROUTES.SALES.TRANSACTIONS_USER}
          element={<UserTransactions />}
        ></Route>
      </Route>
    </Route>
    <Route
      path={ROUTES.SALES.FORM_EDITOR}
      element={<WrapperSalesForm hashMode={false} />}
    >
      <Route path={ROUTES.SALES.FORM_EDITOR} element={<SalesForm />} />
      <Route path={ROUTES.SALES.PAYMENT} element={<Payment />} />
    </Route>
    <Route
      path={ROUTES.SALES.COMMISSIONS}
      element={<Commission lastMonth={true} expandedCommissions />}
    />
  </Route>
);

export default SalesRouter;
