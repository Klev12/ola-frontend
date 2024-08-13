export interface CommissionGetDto {
  id?: number;
  userId?: number;
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
