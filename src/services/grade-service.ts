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

  findAll({ testId }: { testId?: number }) {
    let api = `${ENV.BACKEND_ROUTE}/grades`;
    if (testId) {
      api += `?testId=${testId}`;
    }

    return axios.get<{ grades: GradeGetDto[] }>(api);
  }
}

const gradeService = new GradeService();

export default gradeService;
