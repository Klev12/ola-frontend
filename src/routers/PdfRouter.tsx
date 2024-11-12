import { Route } from "react-router";
import ROUTES from "../consts/routes";
import AuthAppGuard from "../guard/AuthAppGuard";

import { lazy } from "react";

const Pdf = lazy(() => import("../pages/pdf/Pdf"));
const SalesFormPdf = lazy(() => import("../pages/pdf/SalesFormPdf"));
const UserFormPdf = lazy(() => import("../pages/pdf/UserFormPdf"));
const TestFormPdf = lazy(() => import("../pages/pdf/TestFormPdf"));
const HubFormPdf = lazy(() => import("../pages/pdf/HubFormPdf"));

const PdfRouter = (
  <Route
    path={ROUTES.PDF.ME}
    element={
      <AuthAppGuard>
        <Pdf />
      </AuthAppGuard>
    }
  >
    <Route path={ROUTES.PDF.ID} element={<SalesFormPdf />}></Route>
    <Route path={ROUTES.PDF.USER} element={<UserFormPdf />} />
    <Route path={ROUTES.PDF.TEST} element={<TestFormPdf />} />
    <Route path={ROUTES.PDF.HUB} element={<HubFormPdf />} />
  </Route>
);

export default PdfRouter;
