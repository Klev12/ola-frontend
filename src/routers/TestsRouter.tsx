import { Route } from "react-router";
import ROUTES from "../consts/routes";
import Tests from "../pages/tests/Tests";
import TestCreation from "../pages/tests/TestCreation";
import TestResolution from "../pages/tests/TestResolution";
import TestChecking from "../pages/tests/TestChecking";
import EditForm from "../pages/tests/EditForm";
import Resolver from "../pages/tests/Resolver";

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
