import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { CommissionGetDto } from "../models/commission";

class CommissionService {
  findAll({
    page = 1,
    limit = 20,
    collected,
    month,
  }: {
    page?: number;
    limit?: number;
    collected?: boolean;
    month?: number;
  }) {
    let api = `${ENV.BACKEND_ROUTE}/commissions?page=${page}&&limit=${limit}`;
    if (collected !== undefined) {
      api += `&&collected=${collected}`;
    }

    if (month) {
      api += `&&month=${month}`;
    }

    return axios.get<{ count: number; commissions: CommissionGetDto[] }>(api);
  }
}

const commissionService = new CommissionService();

export default commissionService;
