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
    get TEAM() {
      return `${this.ME}/team`;
    },
    get TEAM_USERS() {
      return `${this.TEAM}/:id/users`;
    },
    TEAM_USERS_ID(id: string) {
      return `${this.TEAM}/${id}/users`;
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
};

export default ROUTES;
