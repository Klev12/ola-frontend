export interface UserGetDto {
  id: number | string;
  fullname: string;
  email: string;
  role: string;
  area: string;
  has_access: boolean;
  verified: boolean;
}
