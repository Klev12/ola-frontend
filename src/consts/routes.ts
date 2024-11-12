import DASHBOARD_ROUTES from "./routes/dashboard-routes";
import PAYMENT_ROUTES from "./routes/payment-routes";
import PDF_ROUTES from "./routes/pdf-routes";
import SALES_ROUTES from "./routes/sales-routes";
import TESTS_ROUTES from "./routes/tests-routes";

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
  DASHBOARD: DASHBOARD_ROUTES,
  NOTIFICATIONS: {
    ME: "/notifications",
  },
  SALES: SALES_ROUTES,
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
  TESTS: TESTS_ROUTES,
  PAYPHONE: {
    ME: "/payphone",
    get LINK() {
      return `${this.ME}/:token`;
    },
    LINK_TOKEN(token: string) {
      return `${this.ME}/${token}`;
    },
  },
  PDF: PDF_ROUTES,
  TRAINING: {
    ME: "/training",
  },
  PAYPAL: {
    ME: "/paypal",
    get CAPTURE() {
      return `${this.ME}/capture`;
    },
  },
  PAYMENT: PAYMENT_ROUTES,
};

export default ROUTES;
