import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FieldPostDto } from "../models/field";

export function createField(field: FieldPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/fields`, field);
}
