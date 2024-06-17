import { FormScheme } from "./form-scheme";
import { FormGetDto } from "./forms";

export interface UserFormGetDto {
  user_form: FormGetDto;
  form_scheme: FormScheme;
  form?: FormGetDto;
}
