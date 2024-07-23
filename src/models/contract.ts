export interface ContractGetDto {
  id: string | number | undefined;
  title: string;
  description: string;
  type: ContractType;
  project?: number;
  monthly_payment?: number;
  suscription?: number;
}

export enum ContractType {
  termsAndConditions = "term-and-conditions",
}
