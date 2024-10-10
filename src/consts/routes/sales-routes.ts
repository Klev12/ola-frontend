const SALES_ROUTES = {
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
};

export default SALES_ROUTES;
