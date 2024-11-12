import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import { PaypalLinkDto } from "../models/paypal";
import { TransactionGetDto } from "../models/transaction";

export class PaypalService {
  readonly api = {
    createOrder: `${ENV.BACKEND_ROUTE}/paypal/create-order`,
    captureOrder: `${ENV.BACKEND_ROUTE}/paypal/capture-order`,
  };

  createOrder({ token }: { token: string }) {
    return axios.post<{ links: PaypalLinkDto[] }>(this.api.createOrder, {
      transactionToken: token,
    });
  }

  captureOrder({ token }: { token: string }) {
    return axios.post<{ transaction: TransactionGetDto }>(
      this.api.captureOrder,
      { transactionToken: token }
    );
  }
}

const paypalService = new PaypalService();

export default paypalService;
