import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormScheme } from "../models/form-scheme";
import { TestGetDto, TestPostDto } from "../models/test";

export function getAllTests() {
  return axios.get<{ tests: TestGetDto[] }>(`${ENV.BACKEND_ROUTE}/tests`);
}

export function createNewTest(test: TestPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/tests`, test);
}

export function getTestById({ id }: { id: number }) {
  return axios.get<{ test: TestGetDto; formScheme: FormScheme }>(
    `${ENV.BACKEND_ROUTE}/tests/${id}`
  );
}

export function deleteTestById({ id }: { id: number }) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/tests/${id}`);
}

export function markTestAsPublished(testId: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/tests/mark-as-published`, { testId });
}
