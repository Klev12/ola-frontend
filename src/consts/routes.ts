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
  },
};

export default ROUTES;
