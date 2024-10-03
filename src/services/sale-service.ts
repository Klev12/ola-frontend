import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { SaleGetDto, SalePaymentMethod, SalePostDto } from "../models/sale";

export class SaleService {
  findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    return axios.get<{ count: number; forms: SaleGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/forms/sales?page=${page}&&limit=${limit}`
    );
  }

  save(sale: SalePostDto) {
    return axios.post(`${ENV.BACKEND_ROUTE}/forms/sales`, sale);
  }

  create(sale: {
    amount: number;
    discount: number;
    contractId: number;
    paymentMethod: SalePaymentMethod;
  }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/forms/sales`, sale);
  }
}

const saleService = new SaleService();

export default saleService;
