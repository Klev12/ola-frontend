export interface TestPostDto {
  title: string;
  score?: number;
}

export interface TestGetDto {
  id: number | string;
  title: string;
  score: number;
  published: boolean;
  form_scheme_id: number;
}
