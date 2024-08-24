export interface ContractGetDto {
  id: string | number | undefined;
  title: string;
  description: string;
  html?: string | null;
  type: ContractType;
  project?: number | string;
  monthly_payment?: number | string;
  suscription?: number | string;
}

export interface ContractPatchDto {
  title?: string;
  description?: string;
  contractId: number;
  html?: string;
  project?: number;
  monthlyPayment?: number;
  suscription?: number;
}

export enum ContractType {
  userForm = "user-form",
  marketing = "marketing",
  graphicDesign = "graphic-design",
  sales = "sales",
}
