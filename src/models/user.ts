import { Collaborator } from "./collaborator";
import { LevelGetDto } from "./level";

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
  code: string;
  collaborators: Collaborator[];
  level?: LevelGetDto;
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
  signature = "signature",
}

export enum Roles {
  admin = "admin",
  secretary = "secretary",
  user = "user",
  sales = "sales",
  groupAdmin = "group_admin",
}

export enum UserArea {
  commercial = "commercial",
  design = "design",
  communityManager = "community-manager",
  photograph = "photograph",
  telemarketing = "telemarketing",
  secretary = "secretary",
  marketing = "marketing",
  communication = "communication",
}
