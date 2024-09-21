import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { GradeGetDto } from "../models/grade";

class GradeService {
  submit({ testId, results }: { testId: number; results: string[] }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/grades/submit`, {
      testId,
      results,
    });
  }

  findAll({
    testId,
    userId,
    page = 1,
    limit = 10,
  }: {
    testId?: number;
    userId?: number;
    page?: number;
    limit?: number;
  }) {
    let api = `${ENV.BACKEND_ROUTE}/grades?page=${page}&&limit=${limit}`;
    if (testId) {
      api += `&&testId=${testId}`;
    }
    if (userId) {
      api += `&&userId=${userId}`;
    }

    return axios.get<{ count: number; grades: GradeGetDto[] }>(api);
  }

  startTimer({ testId }: { testId: number }) {
    return axios.post(`${ENV.BACKEND_ROUTE}/grades/start-timer`, { testId });
  }
}

const gradeService = new GradeService();

export default gradeService;
