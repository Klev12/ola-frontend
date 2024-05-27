import { FormScheme } from "./form-scheme";

export interface FormsDto {}

export interface FormPostDto {
  form_scheme_id: number | string;
}

export interface FormGetDto {
  id: string | number;
  done: boolean;
  hash: null | string;
  user_id: string | number;
  form_scheme_id: string | undefined | number;
  expire_hash_time: undefined | Date;
}

export interface GenerateLinkPostDto {
  id: string | number;
}
