import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { SalesGetDto } from "../models/sales";

export function getAllSales() {
  return axios.get<{ forms: SalesGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/forms?usernames=true&&done=true`
  );
}

export function verifySalesForm(hash: string) {
  return axios.get(`${ENV.BACKEND_ROUTE}/forms/verify-sales-form/${hash}`);
}

export function verifySalesFormByFormId(formId: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/verify-sales-form`, { formId });
}
