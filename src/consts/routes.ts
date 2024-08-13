const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  get SIGNUP_CODE() {
    return `${this.SIGNUP}/:code`;
  },
  SIGNUP_CODE_STRING(code: string) {
    return `${this.SIGNUP}/${code}`;
  },
  HOME: {
    ME: "/home",
  },
  DASHBOARD: {
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
  },

  SALES: {
    ME: "/sales",
    get FORMS() {
      return `${this.ME}/forms`;
    },
    get DONE_FORMS() {
      return `${this.ME}/done`;
    },
    get PDF() {
      return `${this.ME}/pdf/:id`;
    },
    PDF_ID(id: string | number) {
      return `${this.ME}/pdf/${id}`;
    },
    get HISTORY() {
      return `${this.ME}/history`;
    },
    get HISTORY_TRANSACTIONS() {
      return `${this.HISTORY}/transactions`;
    },
    get HISTORY_COMMISSIONS() {
      return `${this.HISTORY}/commissions`;
    },
    get HISTORY_SALES() {
      return `${this.HISTORY}/sales`;
    },
    get TEAM() {
      return `${this.ME}/team`;
    },
    get TEAM_USERS() {
      return `${this.TEAM}/:id/users`;
    },
    TEAM_USERS_ID(id: string) {
      return `${this.TEAM}/${id}/users`;
    },
    get TRANSACTIONS_USER() {
      return `${this.TEAM_USERS}/:userId/transactions`;
    },
    TRANSACTIONS_USER_ID(teamId: number, userId: number) {
      return `${this.TEAM_USERS_ID(String(teamId))}/${userId}/transactions`;
    },
    get FORM_EDITOR() {
      return `${this.ME}/form-editor/:id`;
    },
    FORM_EDITOR_ID(id: number) {
      return `${this.ME}/form-editor/${id}`;
    },
    get PAYMENT() {
      return `${this.FORM_EDITOR}/payment`;
    },
    PAYMENT_FORM_ID(formId: number) {
      return `${this.FORM_EDITOR_ID(formId)}/payment`;
    },
    get COMMISSIONS() {
      return `${this.ME}/commissions`;
    },
  },
  BLOG: {
    ME: "/blog",
  },

  REGULATION: {
    ME: "/regulation",
  },
  GENERATE_FORM: {
    ME: "/generate-form",
    GENERATE(hash: string) {
      return `${this.ME}/${hash}`;
    },
  },
  USER_FORM: {
    ME: "/user-form",
    get DOCUMENTS() {
      return `${this.ME}/documents`;
    },
    get TERMS_AND_CONDITIONS() {
      return `${this.ME}/terms-and-conditions`;
    },
    get SIGNATURE() {
      return `${this.ME}/signature`;
    },
    get VERIFICATION() {
      return `${this.ME}/verification`;
    },
  },
  FORM_PDF: {
    ME: "/form-pdf/:id",
    ID(id: number | string) {
      return `/form-pdf/${id}`;
    },
  },
  GENERATE_SALES_FORM: {
    ME: "/generate-sales-form/:hash",
    HASH(hash: string) {
      return `/generate-sales-form/${hash}`;
    },
    get PAYMENT() {
      return `${this.ME}/payment`;
    },
    PAYMENT_HASH(hash: string) {
      return this.HASH(hash) + "/payment";
    },
  },
  TESTS: {
    ME: "/tests",
    get EDIT_FORM() {
      return `${this.ME}/edit-form/:id`;
    },
    EDIT_FORM_ID(id: string | number) {
      return `${this.ME}/edit-form/${id}`;
    },
    CONTRACT_TYPE() {
      return `${this.EDIT_FORM_ID}/contract-type`;
    },
  },
  PAYPHONE: {
    ME: "/payphone",
    get LINK() {
      return `${this.ME}/:token`;
    },
    LINK_TOKEN(token: string) {
      return `${this.ME}/${token}`;
    },
  },
};

export default ROUTES;
