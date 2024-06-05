export interface UserGetDto {
  id: number | string;
  fullname: string;
  email: string;
  role: Roles;
  area: UserArea;
  has_access: boolean;
  verified: boolean;
  is_form_verified: boolean;
}

export enum Roles {
  admin = "admin",
  user = "user",
  sales = "sales",
  groupAdmin = "group_admin",
}

export enum UserArea {
  commercial = "asesor comercial",
  design = "design",
  communityManager = "community manager",
  photograph = "fotógrafo",
  telemarketing = "telemarketing",
  secretary = "secretary",
}
