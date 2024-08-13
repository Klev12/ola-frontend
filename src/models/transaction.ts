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
  createdAt: Date;
  costumerName: string;
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
