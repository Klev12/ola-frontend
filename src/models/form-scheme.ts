import { Result } from "./result";

export interface FormScheme {
  id: number | string;
  label: string;
  form_groups: FormGroup[];
}

export interface FormGroup {
  id: number | string;
  label: string;
  form_scheme_id: number | string;
  fields: Field[];
}

export type ComponentType = "input" | "select" | "check" | "chip";

export interface Field {
  id: number | string;
  label: string;
  component: ComponentType;
  metadata: Metadata;
  form_group_id: number | string;
  required: boolean;
  results: Result[];
  identifier: FieldIdentifier;
}

export enum FieldIdentifier {
  lastNames = "last-names",
  names = "names",
  data = "data",
}

export interface Metadata {
  type: string;
  options?: OptionMetadata[];
}

export interface OptionMetadata {
  value: string;
  label: string;
}
