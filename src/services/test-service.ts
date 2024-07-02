import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { TestGetDto, TestPostDto } from "../models/test";

export function getAllTests() {
  return axios.get<{ tests: TestGetDto[] }>(`${ENV.BACKEND_ROUTE}/tests`);
}

export function createNewTest(test: TestPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/tests`, test);
}
