import { GradeResponseGetDto } from "./grade";
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

export type ComponentType = "input" | "select" | "check" | "chip" | "textarea";

export interface Field {
  id: number | string;
  label: string;
  component: ComponentType;
  metadata: Metadata;
  form_group_id: number | string;
  required: boolean;
  results: Result[];
  gradeResponses?: GradeResponseGetDto[];
  identifier: FieldIdentifier;
}

export enum FieldIdentifier {
  lastNames = "last-names",
  names = "names",
  data = "data",
  bussinesName = "bussines-name",
  costumerPhone = "costumer-phone",
  phone = "phone",
  email = "email",
  genre = "genre",
  cardId = "card_id",
  city = "city",
  observations = "observations",
  agreement = "agreement",
  area = "area",
  contractDuration = "contract-duration",
}

export type MetadataTypes =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "string/number";

export interface Metadata {
  type: MetadataTypes;
  options?: OptionMetadata[];
  dependsOn?: string[];
  max?: number;
}

export interface OptionMetadata {
  value: string;
  label: string;
  correct?: "true" | "false";
}
