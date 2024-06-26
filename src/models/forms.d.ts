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
  label: string;
  fullname: string;
  signature: string;
}

export interface GenerateLinkPostDto {
  id: string | number;
}

export interface HashExpirationTimePostDto {
  id: string | number;
  expire_hash_time: number;
}
