import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { TransactionSummaryGetDto } from "../models/transaction-summary";

export class TransactionSummaryService {
  async findAll({
    teamId,
    page = 1,
    limit = 10,
  }: {
    teamId?: number;
    page?: number;
    limit?: number;
  }) {
    let api = `${ENV.BACKEND_ROUTE}/transactions/summary?page=${page}&&limit=${limit}`;
    if (teamId) {
      api += `&&teamId=${teamId}`;
    }

    return axios.get<{
      transactionSummaries: TransactionSummaryGetDto[];
      count: number;
    }>(api);
  }
  async findByTeamId({ teamId }: { teamId: number }) {
    return axios.get<{
      transactionSummary: TransactionSummaryGetDto;
    }>(`${ENV.BACKEND_ROUTE}/transactions/summary/${teamId}`);
  }
}

const transactionSummaryService = new TransactionSummaryService();

export default transactionSummaryService;
