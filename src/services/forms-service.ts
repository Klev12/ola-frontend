import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import { FormPostDto } from "../models/forms";

export function createForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}
