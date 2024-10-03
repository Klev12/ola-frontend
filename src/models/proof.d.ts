export interface ProofGetDto {
  id: number;
  hash: string;
  formId: number;
  transactionId?: number | null;
  userId: number;
  formCode: string;
}
