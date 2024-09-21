export interface TermAndConditionsGetDto {
  id: string | number;
  title: string;
  description: string;
  html: string;
  type: TermAndConditionsType;
}

export interface TermAndConditionsPatchDto {
  title?: string;
  description?: string;
  html?: string;
  termAndConditionsId: number;
}

export enum TermAndConditionsType {
  userForm = "user-form",
  salesForm = "sales-form",
}
