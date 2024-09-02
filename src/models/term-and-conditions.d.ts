export interface TermAndConditionsGetDto {
  id: string | number;
  title: string;
  description: string;
  html: string;
}

export interface TermAndConditionsPatchDto {
  title?: string;
  description?: string;
  html?: string;
  termAndConditionsId: number;
}
