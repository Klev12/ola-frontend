import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";

export class PaypalService {
  readonly api = {
    createOrder: `${ENV.BACKEND_ROUTE}/paypal/create-order`,
    captureOrder: `${ENV.BACKEND_ROUTE}/paypal/capture-order`,
  };

  createOrder({ token }: { token: string }) {
    return axios.post(this.api.createOrder, { transactionToken: token });
  }
}
