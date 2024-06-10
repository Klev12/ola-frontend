export interface UserGetDto {
  id: number | string;
  fullname: string;
  email: string;
  role: Roles;
  area: UserArea;
  has_access: boolean;
  verified: boolean;
  is_form_verified: boolean;
  multimedias: UserMultimedia[];
}

export interface UserMultimedia {
  id: string | number;
  type: string;
  name: string;
  hash: string;
}

export enum MultimediaType {
  cardId = "card_id",
  video = "video",
}

export enum Roles {
  admin = "admin",
  secretary = "secretary",
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
