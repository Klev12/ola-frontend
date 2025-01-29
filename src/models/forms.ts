import { ContractGetDto } from "./contract";
import { FileGetDto } from "./file";
import { FormCourseGetDto } from "./form-course";
import { FormServiceGetDto } from "./form-service";
import { PaymentGetDto } from "./payment";
import { TermAndConditionsGetDto } from "./term-and-conditions";
import { TransactionGetDto } from "./transaction";
import { UserGetDto } from "./user";

export interface FormsDto {}

export interface FormDetails {
  userNames?: string;
  userLastNames?: string;
  storeName?: string;
  cardId?: string;
  area?: string;
  genre?: "Hombre" | "Mujer";
  city?: string;
  agreement?: string;
  observations?: string;
  createdAt?: string;
  contractDuration?: string;
}

export interface FormPostDto {
  form_scheme_id: number | string;
}

export interface FormGetDto {
  id: string | number;
  done: boolean;
  code: string;
  hash: null | string;
  hashAccess: FormHashAccess;
  user_id: string | number;
  form_scheme_id: string | undefined | number;
  expire_hash_time: undefined | Date;
  label: string;
  fullname: string;
  signature: string;
  contract_id: number | string;
  term_and_conditions_id: number | string;
  contract: ContractGetDto;
  term_and_condition: TermAndConditionsGetDto;
  files?: FileGetDto[];
  payment: PaymentGetDto;
  transactions: TransactionGetDto[];
  block: boolean;
  createdAt: string;
  user?: UserGetDto;
  form_course?: FormCourseGetDto;
  form_service?: FormServiceGetDto;
}

export interface GenerateLinkPostDto {
  id: string | number;
  hashAccess: FormHashAccess;
}

export interface InvalidateLinkPostDto {
  id: number;
}

export interface HashExpirationTimePostDto {
  id: string | number;
  expire_hash_time: number;
}

export interface FormContractUpdateDto {
  id: string | number;
  contract_id: string | number;
  hash?: string;
}

export enum FormHashAccess {
  full = "full",
  readOnly = "read-only",
  onlySignature = "only-signature",
}
