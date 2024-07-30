import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import {
  PaymentGetDto,
  PaymentPostDto,
  PaymentPutDto,
} from "../models/payment";

export function createPayment(payment: PaymentPostDto) {
  return axios.post<{ payment: PaymentGetDto }>(
    `${ENV.BACKEND_ROUTE}/payments`,
    payment
  );
}

export function updatePayment(payment: PaymentPutDto) {
  return axios.put(`${ENV.BACKEND_ROUTE}/payments`, payment);
}
