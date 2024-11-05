import { Navigate, Route } from "react-router";
import HistorySales from "../pages/sales/HistorySales";
import ROUTES from "../consts/routes";
import HistoryCommissions from "../pages/sales/HistoryCommissions";
import HistoryTransactions from "../pages/sales/HistoryTransactions";
import WrapperSalesForm from "../pages/sales-form/components/WrapperSalesForm";
import Payment from "../pages/sales-form/Payment";
import SalesForm from "../pages/sales-form/SalesForm";
import Commission from "../pages/sales/Commission";
import UserTransactions from "../pages/sales/UserTransactions";
import TeamUsers from "../pages/sales/TeamUsers";
import Team from "../pages/sales/Team";
import { lazy } from "react";

const Sales = lazy(() => import("../pages/sales/Sales"));
const MyForms = lazy(() => import("../pages/sales/MyForms"));
const DoneForms = lazy(() => import("../pages/sales/DoneForms"));
const History = lazy(() => import("../pages/sales/History"));

const SalesRouter = (
  <Route path={ROUTES.SALES.ME} element={<Sales />}>
    <Route path={ROUTES.SALES.FORMS} element={<MyForms />} />
    <Route path={ROUTES.SALES.DONE_FORMS} element={<DoneForms />} />
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
