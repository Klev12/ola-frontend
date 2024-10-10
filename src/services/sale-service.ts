import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  SaleCommercialCost,
  SaleGetDto,
  SaleMemberShip,
  SalePaymentMethod,
  SalePostDto,
} from "../models/sale";

export class SaleService {
  findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    return axios.get<{ count: number; forms: SaleGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/forms/sales?page=${page}&&limit=${limit}`
    );
  }

  save(sale: SalePostDto) {
    return axios.post(`${ENV.BACKEND_ROUTE}/forms/sales`, sale);
  }

  createCourse(sale: {
    commercialCost: SaleCommercialCost;
    membership: SaleMemberShip;
    observations?: string;
    totalToPay: number;
    amount: number;
    discount: number;
    contractId: number;
    paymentMethod: SalePaymentMethod;
    courseId: number;
  }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/forms/sales/course`, sale);
  }
}

const saleService = new SaleService();

export default saleService;
