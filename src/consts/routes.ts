const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: {
    ME: "/home",
    FORM: "/Form",
    get NOTIFICATIONS() {
      return `${this.ME}/notifications`;
    },
    get USERS() {
      return `${this.ME}/users`;
    },
  },
};

export default ROUTES;
