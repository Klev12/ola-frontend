const PDF_ROUTES = {
  ME: "/pdf",
  get ID() {
    return `${this.ME}/:id`;
  },
  PDF_ID(id: number) {
    return `${this.ME}/${id}`;
  },
  get USER() {
    return `${this.ME}/user-form/:id`;
  },
  USER_ID(id: number) {
    return `${this.ME}/user-form/${id}`;
  },
  get TEST() {
    return `${this.ME}/test/:id`;
  },
  TEST_ID(id: number) {
    return `${this.ME}/test/${id}`;
  },
  get HUB() {
    return `${this.ME}/hub/:id`;
  },
  HUB_ID(id: number) {
    return `${this.ME}/hub/${id}`;
  },
};

export default PDF_ROUTES;
