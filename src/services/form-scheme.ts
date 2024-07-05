import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormScheme } from "../models/form-scheme";
import { FormContractUpdateDto } from "../models/forms";

export function getFormSchemeById(id: number | string) {
  return axios.get<{ form_scheme: FormScheme }>(
    `${ENV.BACKEND_ROUTE}/form-schemes/${id}`
  );
}

export function patchFormContract(form: FormContractUpdateDto) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/forms/contract`, form);
}
