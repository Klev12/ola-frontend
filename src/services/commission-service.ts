import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  CommissionGetDto,
  SummaryCommissionGetDto,
} from "../models/commission";
import { OwnerAccessState } from "../models/global";
import { PaginationOptions } from "../models/pagination-options";

class CommissionService {
  api = {
    base: `${ENV.BACKEND_ROUTE}/commissions`,
    summaries: `${ENV.BACKEND_ROUTE}/commissions/summaries`,
  };

  findAll({
    page = 1,
    limit = 20,
    collected,
    month,
    year,
    ownership,
  }: {
    page?: number;
    limit?: number;
    collected?: boolean;
    month?: number;
    year?: number;
    ownership?: OwnerAccessState;
  }) {
    let api = `${this.api.base}?page=${page}&&limit=${limit}`;
    if (collected !== undefined) {
      api += `&&collected=${collected}`;
    }

    if (month) {
      api += `&&month=${month}`;
    }

    if (year) {
      api += `&&year=${year}`;
    }

    if (ownership) {
      api += `&&ownership=${ownership}`;
    }

    return axios.get<{ count: number; commissions: CommissionGetDto[] }>(api);
  }

  findAllSummaries({
    options: { page = 1, limit = 10 },
    month,
    year,
  }: {
    options: PaginationOptions;
    month?: number;
    year?: number;
  }) {
    let api = `${this.api.summaries}?page=${page}&&limit=${limit}`;

    if (month) {
      api += `&&month=${month}`;
    }
    if (year) {
      api += `&&year=${year}`;
    }

    return axios.get<{
      count: number;
      commissionSummaries: SummaryCommissionGetDto[];
    }>(api);
  }
}

const commissionService = new CommissionService();

export default commissionService;
