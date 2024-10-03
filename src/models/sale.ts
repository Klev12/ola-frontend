import { ContractType } from "./contract";

export interface SaleGetDto {
  id: number;
  done: boolean;
  block: boolean;
  code: string;
  hash: null | string;
  user_id: string | number;
  form_scheme_id: string | undefined | number;
  expire_hash_time: undefined | Date;
  label: string;
  fullname: string;
  signature: string;
  saleAmount?: number | null;
  saleDiscount?: number | null;
  paymentStatus?: SalePaymentStatus | null;
  paymentMethod?: SalePaymentMethod | null;
  contractId: number | string;
  contractType: ContractType;
  contractTitle: string;
}

export interface SalePostDto {
  amount: number;
  discount: number;
  contractId: number;
  paymentMethod: SalePaymentMethod;
}

export enum SalePaymentStatus {
  pending = "pending",
  cancelled = "cancelled",
  checking = "checking",
  paid = "paid",
}

export enum SalePaymentMethod {
  transference = "transference",
  POS = "POS",
  app = "app",
}
