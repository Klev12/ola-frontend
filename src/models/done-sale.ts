import { SaleCommercialCost, SaleMemberShip, SalePaymentMethod } from "./sale";

export interface DoneSaleGetDto {
  id: number;
  code: string;
  userId: number;
  contractTag: string;
  contractId: number;
  transactionAmount: number;
  transactionCustomerName?: string | null;
  transactionBusinessName?: string | null;
  transactionValidity: TransactionValidity;
  userCommission: number;
  paymentMethod: SalePaymentMethod;
  commercialCost: SaleCommercialCost;
  membership: SaleMemberShip;
}

export interface DoneSaleSummaryGetDto {
  transactionTotal: number;
  transactionTotalAmount: number;
  userTotalCommission: number;
  userId: number;
  month: number;
  year: number;
}

export enum TransactionValidity {
  valid = "valid",
  invalid = "invalid",
}
