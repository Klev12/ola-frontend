import { Route } from "react-router";
import ROUTES from "../consts/routes";
import Verification from "../pages/user-form/Verification";
import SignatureDraw from "../pages/signature/Signature";
import TermsAndConditions from "../pages/user-form/TermsAndConditions";
import { lazy } from "react";

const WrapperUserForm = lazy(
  () => import("../pages/user-form/WrapperUserForm")
);
const UserForm = lazy(() => import("../pages/user-form/UserForm"));
const Documents = lazy(() => import("../pages/user-form/Documents"));

const UserFormRouter = (
  <Route path={ROUTES.USER_FORM.ME} element={<WrapperUserForm />}>
    <Route path={ROUTES.USER_FORM.ME} element={<UserForm />} />
    <Route path={ROUTES.USER_FORM.DOCUMENTS} element={<Documents />} />
    <Route
      path={ROUTES.USER_FORM.TERMS_AND_CONDITIONS}
      element={<TermsAndConditions />}
    />
    <Route path={ROUTES.USER_FORM.SIGNATURE} element={<SignatureDraw />} />
    <Route path={ROUTES.USER_FORM.VERIFICATION} element={<Verification />} />
  </Route>
);

export default UserFormRouter;
