import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormScheme } from "../models/form-scheme";

export function getFormSchemeById(id: number | string) {
  return axios.get<{ form_scheme: FormScheme }>(
    `${ENV.BACKEND_ROUTE}/form-schemes/${id}`
  );
}
