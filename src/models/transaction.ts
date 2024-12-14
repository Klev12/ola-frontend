import { TransactionValidity } from "./done-sale";

export interface TransactionGetDto {
  id: number;
  code?: string | null;
  token: string;
  amount: number;
  clientTransactionId: string;
  transactionId: number;
  formId: number;
  storeName: string;
  statusCode: TransactionStatus;
  createdAt: string;
  costumerName: string;
  businessName: string;
  validity: TransactionValidity;
  userFullname: string;
  userCode: string;
  proofId?: number | null;
  proofHash?: number | null;
}

export interface TransactionSummaryGetDto {
  totalAmount: number;
  total: number;
  totalPending: number;
  totalComplete: number;
  totalPendingAmount: number;
  totalCompleteAmount: number;
  month: number;
  year: number;
}

export interface TransactionPostDto {
  phoneNumber: string;
  countryCode: number;
  formId: number;
}

export enum TransactionStatus {
  pending = 1,
  cancelled,
  accepted,
}

export interface TransactionCardPostDto {
  cardNumber: string;
  holderName: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  email: string;
  formId: number;
}
