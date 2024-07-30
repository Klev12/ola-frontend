export interface TransactionGetDto {
  id: number;
  amount: number;
  clientTransactionId: string;
  transactionId: number;
  formId: number;
  storeName: string;
  statusCode: TransactionStatus;
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
