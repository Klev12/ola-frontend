import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  TermAndConditionsGetDto,
  TermAndConditionsPatchDto,
} from "../models/term-and-conditions";

class TermAndConditionsService {
  async findAll() {
    return axios.get<{ termAndConditions: TermAndConditionsGetDto[] }>(
      `${ENV.BACKEND_ROUTE}/term-and-conditions`
    );
  }

  async patch(termAndConditions: TermAndConditionsPatchDto) {
    return axios.patch(
      `${ENV.BACKEND_ROUTE}/term-and-conditions`,
      termAndConditions
    );
  }
}

const termAndConditionsService = new TermAndConditionsService();

export default termAndConditionsService;
