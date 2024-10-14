import axios from "../../interceptors/axios-interceptor";

export class ServiceScheme {
  api: string = "";

  constructor({ api }: { api: string }) {
    this.api = api;
  }

  create(obj?: unknown) {
    return axios.post(this.api, obj);
  }

  patch(obj?: unknown) {
    console.log(this);
    return axios.patch(this.api, obj);
  }

  deleteById(id: number) {
    return axios.delete(`${this.api}/${id}`);
  }
}