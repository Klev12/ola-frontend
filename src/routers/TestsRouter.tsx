import { Route } from "react-router";
import ROUTES from "../consts/routes";
import { lazy } from "react";

const Tests = lazy(() => import("../pages/tests/Tests"));
const TestCreation = lazy(() => import("../pages/tests/TestCreation"));
const TestResolution = lazy(() => import("../pages/tests/TestResolution"));
const TestChecking = lazy(() => import("../pages/tests/TestChecking"));
const EditForm = lazy(() => import("../pages/tests/EditForm"));
const Resolver = lazy(() => import("../pages/tests/Resolver"));

const TestsRouter = (
  <Route path={ROUTES.TESTS.ME}>
    <Route path={ROUTES.TESTS.ME} element={<Tests />}>
      <Route path={ROUTES.TESTS.CREATE} element={<TestCreation />} />
      <Route path={ROUTES.TESTS.RESOLVE} element={<TestResolution />} />
      <Route path={ROUTES.TESTS.CHECK} element={<TestChecking />} />
    </Route>
    <Route path={ROUTES.TESTS.EDIT_FORM} element={<EditForm />}></Route>
    <Route path={ROUTES.TESTS.RESOLVER} element={<Resolver />}></Route>
  </Route>
);

export default TestsRouter;
