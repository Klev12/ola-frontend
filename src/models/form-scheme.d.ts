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

export type ComponentType = "input" | "select";

export interface Field {
  id: number | string;
  label: string;
  component: ComponentType;
  metadata: Metadata;
  form_group_id: number | string;
}

export interface Metadata {
  type: string;
}
