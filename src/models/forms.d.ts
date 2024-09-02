import { ContractGetDto } from "./contract";
import { FileGetDto } from "./file";
import { PaymentGetDto } from "./payment";
import { TermAndConditionsGetDto } from "./term-and-conditions";
import { TransactionGetDto } from "./transaction";

export interface FormsDto {}

export interface FormDetails {
  userNames?: string;
  userLastNames?: string;
  storeName?: string;
  cardId?: string;
}

export interface FormPostDto {
  form_scheme_id: number | string;
}

export interface FormGetDto {
  id: string | number;
  done: boolean;
  code: string;
  hash: null | string;
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
}

export interface GenerateLinkPostDto {
  id: string | number;
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
