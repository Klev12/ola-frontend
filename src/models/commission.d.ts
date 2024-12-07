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
