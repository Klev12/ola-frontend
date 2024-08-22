export interface TermAndConditionsGetDto {
  id: string | number;
  title: string;
  description: string;
}

export interface TermAndConditionsPatchDto {
  title?: string;
  description?: string;
  termAndConditionsId: number;
}
