import { Route } from "react-router";
import ROUTES from "../consts/routes";
import AuthAppGuard from "../guard/AuthAppGuard";
import Pdf from "../pages/pdf/Pdf";
import SalesFormPdf from "../pages/pdf/SalesFormPdf";
import UserFormPdf from "../pages/pdf/UserFormPdf";
import TestFormPdf from "../pages/pdf/TestFormPdf";
import HubFormPdf from "../pages/pdf/HubFormPdf";

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
