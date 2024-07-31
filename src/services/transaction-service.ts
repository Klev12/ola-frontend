import {
  TransactionCardPostDto,
  TransactionGetDto,
  TransactionPostDto,
} from "../models/transaction";
import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";

export function createTransactionPayphone(transaction: TransactionPostDto) {
  return axios.post<{ transaction: TransactionGetDto }>(
    `${ENV.BACKEND_ROUTE}/transactions/payphone`,
    transaction
  );
}

export function verifyStatusTransaction(transactionId: number | string) {
  return axios.get<{ transaction: TransactionGetDto }>(
    `${ENV.BACKEND_ROUTE}/transactions/status/${transactionId}`
  );
}

export function createTransactionWithCard(transaction: TransactionCardPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/transactions/card`, transaction);
}
