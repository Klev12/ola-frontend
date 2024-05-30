export interface UserGetDto {
  id: number | string;
  fullname: string;
  email: string;
  role: Roles;
  area: string;
  has_access: boolean;
  verified: boolean;
}

export enum Roles {
  admin = "admin",
  user = "user",
  sales = "sales",
  groupAdmin = "group_admin",
}
