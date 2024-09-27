import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormScheme } from "../models/form-scheme";
import { TestGetDto, TestPostDto, TestToResolveGetDto } from "../models/test";

export function getMyTests({
  published = "all",
  page = 1,
  limit = 10,
}: {
  published?: "all" | "true" | "false";
  page?: number;
  limit?: number;
}) {
  return axios.get<{ count: number; tests: TestGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/tests?published=${published}&&page=${page}&&limit=${limit}`
  );
}

export function getAllTests({
  page = 1,
  limit = 10,
  published = "all",
  keyword,
}: {
  published?: "all" | "true" | "false";
  page?: number;
  limit?: number;
  keyword?: string;
}) {
  let api = `${ENV.BACKEND_ROUTE}/tests/all?published=${published}&&page=${page}&&limit=${limit}`;

  if (keyword) {
    api += `&&keyword=${keyword}`;
  }

  return axios.get<{ count: number; tests: TestGetDto[] }>(api);
}

export function getAllTestToResolve({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  return axios.get<{ count: number; tests: TestToResolveGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/tests/resolve?page=${page}&&limit=${limit}`
  );
}

export function createNewTest(test: TestPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/tests`, test);
}

export function getTestById({ id, userId }: { id: number; userId: number }) {
  return axios.get<{ test: TestGetDto; formScheme: FormScheme }>(
    `${ENV.BACKEND_ROUTE}/tests/results/${id}?userId=${userId}`
  );
}

export function deleteTestById({ id }: { id: number }) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/tests/${id}`);
}

export function markTestAsPublished({
  testId,
  startDate,
  endDate,
}: {
  testId: number;
  startDate: string;
  endDate: string;
}) {
  return axios.post(`${ENV.BACKEND_ROUTE}/tests/mark-as-published`, {
    testId,
    startDate,
    endDate,
  });
}

export function patchTest({
  testId,
  title,
}: {
  testId: number;
  title?: string;
}) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/tests`, { testId, title });
}
