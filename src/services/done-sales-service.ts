import { ENV } from "../consts/const";
import { PaginationOptions } from "../models/pagination-options";
import axios from "../interceptors/axios-interceptor";
import { DoneSaleGetDto, DoneSaleSummaryGetDto } from "../models/done-sale";

export class DoneSaleService {
  findAll({
    options = { page: 1, limit: 10 },
    month,
    year,
  }: {
    options?: PaginationOptions;
    month?: number;
    year?: number;
  }) {
    let api = `${ENV.BACKEND_ROUTE}/forms/done-sales?page=${options.page}&&limit=${options.limit}`;
    if (month) {
      api += `&&month=${month}`;
    }

    if (year) {
      api += `&&year=${year}`;
    }

    return axios.get<{ count: number; sales: DoneSaleGetDto[] }>(api);
  }

  findAllSummaries({
    options = { page: 1, limit: 10 },
    userId,
    month,
    year,
  }: {
    options?: PaginationOptions;
    userId?: number;
    month?: number;
    year?: number;
  }) {
    let api = `${ENV.BACKEND_ROUTE}/done-sales/summaries?page=${options.page}&&limit=${options.limit}`;
    if (userId) {
      api += `&&userId=${userId}`;
    }

    if (month) {
      api += `&&month=${month}`;
    }

    if (year) {
      api += `&&year=${year}`;
    }

    return axios.get<{ count: number; saleSummaries: DoneSaleSummaryGetDto[] }>(
      api
    );
  }
}

const doneSaleService = new DoneSaleService();

export default doneSaleService;
