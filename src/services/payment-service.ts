import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import { PaymentPostDto } from "../models/payment";

export function createPayment(payment: PaymentPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/payments`, payment);
}
