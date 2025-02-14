import axios from "../interceptors/axios-interceptor";
import { ENV } from "../consts/const";
import {
  FormGetDto,
  FormPostDto,
  GenerateLinkPostDto,
  HashExpirationTimePostDto,
  InvalidateLinkPostDto,
} from "../models/forms";
import { UserFormGetDto } from "../models/user-form";
import { dataURLToBlob } from "./document-service";
import { PaymentGetDto } from "../models/payment";
import { PaginationOptions } from "../models/pagination-options";
import { TransactionGetDto } from "../models/transaction";

export function createForm(form: FormPostDto) {
  console.log(form);
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, {
    formSchemeId: form.form_scheme_id,
  });
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

export function getAllForms({
  page = 1,
  limit = 10,
  type = "all",
  keyword,
}: {
  page?: number;
  limit?: number;
  type?: "userform" | "salesform" | "all";
  keyword?: string;
}) {
  let api = `${ENV.BACKEND_ROUTE}/forms/all?page=${page}&&limit=${limit}&&type=${type}`;

  if (keyword) {
    api += `&&keyword=${keyword}`;
  }

  return axios.get<{ forms: FormGetDto[]; count: number }>(api);
}

export function getMyForms({ page = 1, limit = 10 }: PaginationOptions) {
  return axios.get<{ forms: FormGetDto[]; count: number }>(
    `${ENV.BACKEND_ROUTE}/forms?page=${page}&&limit=${limit}`
  );
}

export function getFormById(id: string | number) {
  return axios.get<UserFormGetDto>(`${ENV.BACKEND_ROUTE}/forms/${id}`);
}

export function generateLink(form: GenerateLinkPostDto) {
  return axios
    .post<{ form: { id: number; hash: string } }>(
      `${ENV.BACKEND_ROUTE}/forms/generate-link`,
      {
        formId: form.id,
        hashAccess: form.hashAccess,
      }
    )
    .then((res) => res.data);
}

export function invalidateLink(form: InvalidateLinkPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/invalidate-link`, {
    formId: form.id,
  });
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
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/verify-form`, { formId: id });
}

export function generateFormByHash(hash: string) {
  return axios.get<UserFormGetDto>(
    `${ENV.BACKEND_ROUTE}/forms/generate-form/${hash}`
  );
}

export function setLinkExpirationTime(data: HashExpirationTimePostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/expire-time`, {
    expireHashTime: data.expire_hash_time,
    formId: data.id,
  });
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

export function getFormByToken({ token }: { token: string }) {
  return axios.get<{ form: FormGetDto; transaction: TransactionGetDto }>(
    `${ENV.BACKEND_ROUTE}/forms/token/${token}`
  );
}

export function setPaymentStatusForm({ formId }: { formId: number }) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/payment-status`, { formId });
}
