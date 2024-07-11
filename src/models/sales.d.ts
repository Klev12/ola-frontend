import { FormGetDto } from "./forms";

export interface SalesGetDto extends FormGetDto {
  results: SalesResults[];
  form_scheme?: {
    label: string;
  };
  user?: {
    fullname: string;
  };
}

export interface SalesResults {
  response: SalesResponse;
}

export interface SalesResponse {
  value: string;
}
