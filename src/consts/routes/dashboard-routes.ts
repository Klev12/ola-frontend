const DASHBOARD_ROUTES = {
  ME: "/dashboard",
  get USERS() {
    return `${this.ME}/users`;
  },
  get USER_TEAMS() {
    return `${this.USERS}/:id/teams`;
  },
  USER_TEAMS_ID(userId: string | number) {
    return `${this.USERS}/${userId}/teams`;
  },
  get NOTIFICATIONS() {
    return `${this.ME}/notifications`;
  },
  get CHECK_USER_FORM() {
    return `${this.ME}/check-user-form/:id`;
  },
  CHECK_USER_FORM_ID(id: number | string) {
    return `${this.ME}/check-user-form/${id}`;
  },
  get CHECK_FORM() {
    return `${this.ME}/check-form/:id`;
  },
  CHECK_FORM_ID(id: number | string) {
    return `${this.ME}/check-form/${id}`;
  },
  get COLLABORATORS() {
    return `${this.ME}/collaborators`;
  },
  get PENDING_USERS() {
    return `${this.ME}/pending-users`;
  },
  get FORMS() {
    return `${this.ME}/forms`;
  },
  get FORMS_USER() {
    return `${this.FORMS}/type-user`;
  },
  get FORMS_SALES() {
    return `${this.FORMS}/type-sales`;
  },
  get GLOBAL() {
    return `${this.ME}/global`;
  },
  get GLOBAL_CONTRACTS() {
    return `${this.GLOBAL}/contracts`;
  },
  get GLOBAL_TERMS_AND_CONDITIONS() {
    return `${this.GLOBAL}/terms-and-conditions`;
  },
  get GLOBAL_REGULATION() {
    return `${this.GLOBAL}/regulation`;
  },
  get GLOBAL_COURSES() {
    return `${this.GLOBAL}/courses`;
  },
  get GLOBAL_SERVICES() {
    return `${this.GLOBAL}/services`;
  },
  get GLOBAL_SERVICE_OPTIONS() {
    return `${this.GLOBAL}/services/:serviceId/options`;
  },
  GLOBAL_SERVICE_OPTIONS_ID(serviceId: number) {
    return `${this.GLOBAL}/services/${serviceId}/options`;
  },
  get TEAMS() {
    return `${this.ME}/teams`;
  },
};

export default DASHBOARD_ROUTES;
