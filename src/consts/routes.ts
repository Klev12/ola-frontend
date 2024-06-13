const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
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
  },

  SALES: {
    ME: "/sales",
    get FORMS() {
      return `${this.ME}/forms`;
    },
    get DONE_FORMS() {
      return `${this.ME}/done`;
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
};

export default ROUTES;
