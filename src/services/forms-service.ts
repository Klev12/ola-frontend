import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import {
  FormGetDto,
  FormPostDto,
  GenerateLinkPostDto,
  HashExpirationTimePostDto,
} from "../models/forms";
import { UserFormGetDto } from "../models/user-form";
import { dataURLToBlob } from "./document-service";
import { PaymentGetDto } from "../models/payment";

export function createForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}

export function getPaymentForm(formId: number) {
  return axios.get<{ payment: PaymentGetDto }>(
    `${ENV.BACKEND_ROUTE}/${formId}/payment`
  );
}

export function patchTotalFormPayment({
  total,
  formId,
}: {
  total: number;
  formId: number;
}) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/forms/payment`, { total, formId });
}

export function getAllForms() {
  return axios.get<{ forms: FormGetDto[] }>(`${ENV.BACKEND_ROUTE}/forms/all`);
}

export function getMyForms() {
  return axios.get<{ forms: FormGetDto[] }>(`${ENV.BACKEND_ROUTE}/forms`);
}

export function getFormById(id: string | number) {
  return axios.get<UserFormGetDto>(`${ENV.BACKEND_ROUTE}/forms/${id}`);
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

export function generateFormByHash(hash: string) {
  return axios.get<UserFormGetDto>(
    `${ENV.BACKEND_ROUTE}/forms/generate-form/${hash}`
  );
}

export function setLinkExpirationTime(data: HashExpirationTimePostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/expire-time`, data);
}

export function deleteFormById(id: string | number) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/forms/${id}`);
}

export function addUserSignature({
  image,
  hash,
  hashMode = true,
  formId,
}: {
  image: string;
  hash: string;
  hashMode?: boolean;
  formId?: number | string;
}) {
  const blob = dataURLToBlob(image);
  const formData = new FormData();
  formData.append("signature", blob, "signature.png");
  if (!hashMode) {
    formData.append("formId", formId as string);
  }

  return axios.post(
    `${ENV.BACKEND_ROUTE}/forms/signature/${hashMode ? hash : ""}`,
    formData
  );
}

//for dev purpose
export function markFormToDone({
  formId,
  hash,
}: {
  formId: number;
  hash: string;
}) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/forms/mark-to-done/${hash}`, {
    formId,
  });
}
