import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import { FormGetDto, FormPostDto, GenerateLinkPostDto } from "../models/forms";
import { UserFormGetDto } from "../models/user-form";

export function createForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}

export function getAllForms() {
  return axios.get<{ forms: FormGetDto[] }>(`${ENV.BACKEND_ROUTE}/forms/all`);
}

export function getMyForms() {
  return axios.get<{ forms: FormGetDto[] }>(`${ENV.BACKEND_ROUTE}/forms`);
}

export function generateLink(form: GenerateLinkPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/generate-link`, form);
}

export function invalidateLink(form: GenerateLinkPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/invalidate-link`, form);
}

export function getUserForm() {
  return axios.get<UserFormGetDto>(`${ENV.BACKEND_ROUTE}/forms/user-form`);
}

export function getUserFormByUserId(id: string | number) {
  return axios.get<UserFormGetDto>(
    `${ENV.BACKEND_ROUTE}/forms/user-form/${id}`
  );
}

export function verifyForm(id: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/verify-form`, { id });
}
