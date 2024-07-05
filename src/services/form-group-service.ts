import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormGroupPostDto } from "../models/form-group";
import { FormGroup } from "../models/form-scheme";

export function createFormGroup(formGroup: FormGroupPostDto) {
  return axios.post<FormGroup>(`${ENV.BACKEND_ROUTE}/form-groups`, formGroup);
}

export function deleteFormGroupById(id: number | string) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/form-groups/${id}`);
}
