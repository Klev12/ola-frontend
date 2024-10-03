import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { ProofGetDto } from "../models/proof";

export class ProofService {
  findAll({
    formId,
    page = 1,
    limit = 10,
  }: {
    formId?: number;
    page?: number;
    limit?: number;
  }) {
    let api = `${ENV.BACKEND_ROUTE}/proofs?page=${page}&&limit=${limit}`;
    if (formId) {
      api += `&&formId=${formId}`;
    }

    return axios.get<{ count: number; proofs: ProofGetDto[] }>(api);
  }
}

const proofService = new ProofService();

export default proofService;
