import { TransactionValidity } from "./done-sale";

export interface CommissionGetDto {
  id?: number;
  userId?: number;
  userFullname: string;
  userCode: string;
  transactionId?: number;
  teamId?: number;
  groupAdminId?: number;
  collected: boolean;
  createdAt: Date;
  userCommission: number;
  groupAdminCommission: number | null;
  generalAdminCommission: number | null;
  amount: number;
  groupAdminFullname: string;
  teamName: string;
  validity: TransactionValidity;
}

export interface SummaryCommissionGetDto {
  userTotalCommission: number;
  groupAdminTotalCommission: number;
  generalAdminTotalCommission: number;
  userId: number;
  teamId?: number | null;
  month: number;
  year: number;
}
