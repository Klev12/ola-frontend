const PAYMENT_ROUTES = {
  ME: "/payment/:token",
  TOKEN(token: string) {
    return `payment/${token}`;
  },
};

export default PAYMENT_ROUTES;
