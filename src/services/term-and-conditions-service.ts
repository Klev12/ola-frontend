import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  TermAndConditionsGetDto,
  TermAndConditionsPatchDto,
  TermAndConditionsType,
} from "../models/term-and-conditions";

class TermAndConditionsService {
  async findAll({ type }: { type?: TermAndConditionsType }) {
    let api = `${ENV.BACKEND_ROUTE}/term-and-conditions`;
    if (type) {
      api += `?type=${type}`;
    }

    return axios.get<{ termAndConditions: TermAndConditionsGetDto[] }>(api);
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
