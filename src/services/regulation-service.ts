import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  RegulationGetDto,
  RegulationMarkAsSeenDto,
  RegulationPatchDto,
  RegulationPostDto,
} from "../models/regulations";

class RegulationService {
  async findAll() {
    return axios.get<{ regulations: RegulationGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/regulations`
    );
  }

  async create(regulation: RegulationPostDto) {
    return axios.post(`${ENV.BACKEND_ROUTE}/regulations`, regulation);
  }

  async deleteById(id: number) {
    return axios.delete(`${ENV.BACKEND_ROUTE}/regulations/${id}`);
  }

  async patch(regulation: RegulationPatchDto) {
    return axios.patch(`${ENV.BACKEND_ROUTE}/regulations`, regulation);
  }

  async markAsSeen(regulation: RegulationMarkAsSeenDto) {
    return axios.post(
      `${ENV.BACKEND_ROUTE}/regulations/mark-as-seen`,
      regulation
    );
  }
}

const regulationService = new RegulationService();

export default regulationService;
