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

export function createTransaction({ formId }: { formId: number }) {
  return axios.post(`${ENV.BACKEND_ROUTE}/transactions/generate`, { formId });
}

export function confirmTransaction({
  id,
  clientTxId,
}: {
  id: number;
  clientTxId: string;
}) {
  return axios.post<{ transaction: TransactionGetDto }>(
    `${ENV.BACKEND_ROUTE}/transactions/confirm`,
    {
      id,
      clientTxId,
    }
  );
}

export function getAllTransactions({
  userId,
  teamId,
  page = 1,
  limit = 10,
  month,
  keyword,
}: {
  userId?: number;
  teamId?: number;
  page?: number;
  limit?: number;
  month?: number;
  keyword?: string;
}) {
  let api = `${ENV.BACKEND_ROUTE}/transactions?page=${page}&&limit=${limit}`;
  if (userId) {
    api += `&&userId=${userId}`;
  }

  if (month) {
    api += `&&month=${month}`;
  }

  if (keyword) {
    api += `&&keyword=${keyword}`;
  }

  if (teamId) {
    api += `&&teamId=${teamId}`;
  }

  return axios.get<{ count: number; transactions: TransactionGetDto[] }>(api);
}
