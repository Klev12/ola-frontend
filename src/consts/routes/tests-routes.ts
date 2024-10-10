const TESTS_ROUTES = {
  ME: "/tests",
  get EDIT_FORM() {
    return `${this.ME}/edit-form/:id`;
  },
  EDIT_FORM_ID(id: string | number) {
    return `${this.ME}/edit-form/${id}`;
  },
  CONTRACT_TYPE() {
    return `${this.EDIT_FORM_ID}/contract-type`;
  },
  get RESOLVER() {
    return `${this.ME}/resolver/:id`;
  },
  RESOLVER_TEST_ID(testId: number) {
    return `${this.ME}/resolver/${testId}`;
  },
  get CREATE() {
    return `${this.ME}/create`;
  },
  get RESOLVE() {
    return `${this.ME}/resolve`;
  },
  get CHECK() {
    return `${this.ME}/check`;
  },
};

export default TESTS_ROUTES;
