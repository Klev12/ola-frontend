export default function DASHBOARD_COMMERCIAL_ROUTES(baseRoute: string) {
  return {
    ME: `${baseRoute}/commercial`,
    get SALES() {
      return `${this.ME}/sales`;
    },
    get TRANSACTIONS() {
      return `${this.ME}/transactions`;
    },
    get COMMISSIONS() {
      return `${this.ME}/commissions`;
    },
  };
}
