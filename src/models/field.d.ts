import { Metadata } from "./form-scheme";

export interface FieldPostDto {
  label: string;
  component: string;
  metadata: string;
  required: boolean;
  form_group_id: number;
}

export interface FieldPatchDto {
  fieldId: number;
  label?: string;
  metadata?: Metadata;
}
