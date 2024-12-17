import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";

class MultimediaService {
  readonly api = {
    base: `${ENV.BACKEND_ROUTE}/multimedia`,
    proof: `${ENV.BACKEND_ROUTE}/multimedia/proofs`,
  };

  async deleteByHash(hash: string) {
    return axios.delete(`${ENV.BACKEND_ROUTE}/multimedia/${hash}`);
  }
}

const multimediaService = new MultimediaService();

export default multimediaService;
