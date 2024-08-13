import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { SalesGetDto } from "../models/sales";
import { TransactionGetDto } from "../models/transaction";

export function getAllSales({
  page = 1,
  limit = 10,
  keyword,
}: {
  page?: number;
  limit?: number;
  keyword?: string;
}) {
  let api = `${ENV.BACKEND_ROUTE}/forms?usernames=true&&done=true&&page=${page}&&limit=${limit}`;

  if (keyword) {
    api += `&&keyword=${keyword}`;
  }

  return axios.get<{ forms: SalesGetDto[]; count: number }>(api);
}

export function verifySalesForm(hash: string) {
  return axios.get(`${ENV.BACKEND_ROUTE}/forms/verify-sales-form/${hash}`);
}

export function verifySalesFormByFormId({
  formId,
  hash,
}: {
  formId: number;
  hash?: string;
}) {
  return axios.post<{ transaction: TransactionGetDto }>(
    `${ENV.BACKEND_ROUTE}/forms/verify-sales-form/${hash ? hash : ""}`,
    { formId }
  );
}
