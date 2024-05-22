import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import { FormGetDto, FormPostDto, GenerateLinkPostDto } from "../models/forms";

export function createForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}

export function getAllForms() {
  return axios.get<{ forms: FormGetDto[] }>(`${ENV.BACKEND_ROUTE}/forms`);
}

export function generateLink(form: GenerateLinkPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/generate-link`, form);
}

export function invalidateLink(form: GenerateLinkPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/invalidate-link`, form);
}
