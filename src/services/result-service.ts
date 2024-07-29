import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { AllResultPutDto, ResultPutDto } from "../models/result";

export function addResult(result: ResultPutDto) {
  return axios.put(`${ENV.BACKEND_ROUTE}/results`, result);
}

export function submitForm(results: AllResultPutDto) {
  return axios.put(`${ENV.BACKEND_ROUTE}/results/all`, {
    formId: results.id,
    hash: results.hash,
    results: results.results,
  });
}

export function submitFormByHash(results: AllResultPutDto) {
  return axios.put(`${ENV.BACKEND_ROUTE}/results/all/hash`, results);
}
