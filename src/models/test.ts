export interface TestPostDto {
  title: string;
  score?: number;
}

export interface TestGetDto {
  id: number | string;
  title: string;
  score: number;
  published: boolean;
  expireTime: number;
  formSchemeId: number;
  form_scheme_id: number;
  status: TestStatus;
  createdAt?: string | null;
  startDate?: string | null;
  endDate: string;
}

export enum TestStatus {
  undefined = "undefined",
  upcoming = "upcoming",
  active = "active",
  expired = "expired",
}
