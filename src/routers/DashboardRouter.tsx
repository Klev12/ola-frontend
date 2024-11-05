import { lazy } from "react";
import { Navigate, Route } from "react-router";
import GlobalCourses from "../pages/dashboard/global/GlobalCourses";
import GlobalRegulation from "../pages/dashboard/global/GlobalRegulation";
import GlobalTermsAndConditions from "../pages/dashboard/global/GlobalTermsAndConditions";
import ROUTES from "../consts/routes";
import GlobalContracts from "../pages/dashboard/global/GlobalContracts";
import AllSalesForms from "../pages/dashboard/AllSalesForms";
import { AllUserForms } from "../pages/dashboard/AllUserForms";
import Global from "../pages/dashboard/Global";
import GlobalServices from "../pages/dashboard/global/GlobalServices";
import GlobalServiceOptions from "../pages/dashboard/global/GlobalServiceOptions";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const UserTeam = lazy(() => import("../pages/dashboard/UserTeam"));
const Notifications = lazy(() => import("../pages/dashboard/Notifications"));
const Users = lazy(() => import("../pages/dashboard/Users"));
const Collaborators = lazy(() => import("../pages/dashboard/Collaborators"));
const PendingUsers = lazy(() => import("../pages/dashboard/PendingUsers"));
const AllTeams = lazy(() => import("../pages/dashboard/AllTeams"));
const AllForms = lazy(() => import("../pages/dashboard/AllForms"));

const DashBoardRouter = (
  <Route path={ROUTES.DASHBOARD.ME} element={<Dashboard />}>
    <Route path={ROUTES.DASHBOARD.USER_TEAMS} element={<UserTeam />} />
    <Route path={ROUTES.DASHBOARD.NOTIFICATIONS} element={<Notifications />} />
    <Route path={ROUTES.DASHBOARD.USERS} element={<Users />} />
    <Route path={ROUTES.DASHBOARD.COLLABORATORS} element={<Collaborators />} />
    <Route path={ROUTES.DASHBOARD.PENDING_USERS} element={<PendingUsers />} />
    <Route path={ROUTES.DASHBOARD.TEAMS} element={<AllTeams />} />
    <Route path={ROUTES.DASHBOARD.FORMS} element={<AllForms />}>
      <Route
        path={ROUTES.DASHBOARD.FORMS}
        element={<Navigate to={ROUTES.DASHBOARD.FORMS_USER} />}
      />
      <Route path={ROUTES.DASHBOARD.FORMS_USER} element={<AllUserForms />} />
      <Route path={ROUTES.DASHBOARD.FORMS_SALES} element={<AllSalesForms />} />
    </Route>
    <Route path={ROUTES.DASHBOARD.GLOBAL} element={<Global />}>
      <Route
        path={ROUTES.DASHBOARD.GLOBAL_CONTRACTS}
        element={<GlobalContracts />}
      />
      <Route
        path={ROUTES.DASHBOARD.GLOBAL_TERMS_AND_CONDITIONS}
        element={<GlobalTermsAndConditions />}
      />
      <Route
        path={ROUTES.DASHBOARD.GLOBAL_REGULATION}
        element={<GlobalRegulation />}
      />
      <Route
        path={ROUTES.DASHBOARD.GLOBAL_COURSES}
        element={<GlobalCourses />}
      />
      <Route
        path={ROUTES.DASHBOARD.GLOBAL_SERVICES}
        element={<GlobalServices />}
      />
      <Route
        path={ROUTES.DASHBOARD.GLOBAL_SERVICE_OPTIONS}
        element={<GlobalServiceOptions />}
      />
    </Route>
  </Route>
);

export default DashBoardRouter;
