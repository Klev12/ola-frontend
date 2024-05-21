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
};

export default ROUTES;
