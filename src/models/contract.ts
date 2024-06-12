export interface ContractGetDto {
  id: string | number | undefined;
  title: string;
  description: string;
  type: ContractType;
}

export enum ContractType {
  termsAndConditions = "term-and-conditions",
}
