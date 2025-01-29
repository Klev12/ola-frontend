import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormScheme } from "../models/form-scheme";
import {
  SaleCommercialCost,
  SaleGetDto,
  SaleMemberShip,
  SalePaymentMethod,
  SalePaymentStatus,
  SalePostDto,
} from "../models/sale";
import generateQueryArray from "../utils/query/generate-query-array";

export class SaleService {
  readonly api = {
    base: `${ENV.BACKEND_ROUTE}/forms/sales`,
    summaries: `${ENV.BACKEND_ROUTE}/forms/sales/summaries`,
    partialUpdate: `${ENV.BACKEND_ROUTE}/sales`,
  };

  findAll({
    page = 1,
    limit = 10,
    paymentStatus,
  }: {
    page?: number;
    limit?: number;
    paymentStatus?: SalePaymentStatus[];
  }) {
    const paymentStatusQuery = generateQueryArray({
      name: "paymentStatus",
      values: paymentStatus || [],
    });

    return axios.get<{ count: number; forms: SaleGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/forms/sales?page=${page}&&limit=${limit}&&${paymentStatusQuery}`
    );
  }

  findById({ formId }: { formId: number }) {
    return axios.get<{ form: SaleGetDto; formScheme: FormScheme }>(
      `${ENV.BACKEND_ROUTE}/forms/sales/${formId}`
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
    monthCount: number;
  }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/forms/sales/course`, sale);
  }

  createService(sale: {
    commercialCost: SaleCommercialCost;
    membership: SaleMemberShip;
    observations?: string;
    totalToPay: number;
    amount: number;
    discount: number;
    contractId: number;
    paymentMethod: SalePaymentMethod;
    serviceId: number;
    serviceOptionId: number;
  }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/forms/sales/service`, sale);
  }

  async markAsDeleted({ saleId }: { saleId: number }) {
    return axios.patch(`${ENV.BACKEND_ROUTE}/forms/sales/mark-as-deleted`, {
      formId: saleId,
    });
  }
}

const saleService = new SaleService();

export default saleService;
