import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { TrainingGetDto } from "../models/training";

export class TrainingService {
  findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    return axios.get<{ count: number; trainings: TrainingGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/trainings?page=${page}&&limit=${limit}`
    );
  }

  deleteById({ trainingId }: { trainingId: number }) {
    return axios.delete(`${ENV.BACKEND_ROUTE}/trainings/${trainingId}`);
  }

  updateProperties({
    title,
    trainingId,
  }: {
    title?: string;
    trainingId: number;
  }) {
    return axios.patch(`${ENV.BACKEND_ROUTE}/trainings`, { trainingId, title });
  }
}

const trainingService = new TrainingService();

export default trainingService;
