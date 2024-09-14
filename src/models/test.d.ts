export interface TestPostDto {
  title: string;
  score?: number;
}

export interface TestGetDto {
  id: number | string;
  title: string;
  score: number;
  published: boolean;
  expireTime?: string | null;
  formSchemeId: number;
  form_scheme_id: number;
  status: TestStatus;
  createdAt: string;
  startDate: string;
  endDate: string;
}

export enum TestStatus {
  undefined = "undefined",
  upcoming = "upcoming",
  active = "active",
  expired = "expired",
}
