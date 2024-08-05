import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { CommissionGetDto } from "../models/commission";

class CommissionService {
  findAll({ page = 1, limit = 20 }: { page?: number; limit?: number }) {
    return axios.get<{ count: number; commissions: CommissionGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/commissions?page=${page}&&limit=${limit}`
    );
  }
}

const commissionService = new CommissionService();

export default commissionService;
