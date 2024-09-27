export interface TransactionSummaryGetDto {
  teamId: number;
  generalTeamId?: number | null;
  teamName: string;
  totalComplete: number;
  totalCompleteAmount: number;
  totalPending: number;
  totalPendingAmount: number;
  month: string;
  year: number;
}
