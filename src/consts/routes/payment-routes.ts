const PAYMENT_ROUTES = {
  ME: "/payment/:token",
  TOKEN(token: string) {
    return `payment/${token}`;
  },
  INVOICE(token: string = ":token") {
    return `/payment/invoice/${token}`;
  },
};

export default PAYMENT_ROUTES;
