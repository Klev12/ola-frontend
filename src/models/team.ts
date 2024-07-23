import { UserArea } from "./user";

export interface TeamGetDto {
  id?: number;
  name: string;
  area: TeamArea | UserArea;
}

export enum TeamArea {
  admin = "admin",
  commercial = "commercial",
  design = "design",
  communityManager = "community-manager",
  photograph = "photograph",
  telemarketing = "telemarketing",
  secretary = "secretary",
  marketing = "marketing",
  communication = "communication",
}

export interface TeamUser {
  id?: number;
  user_id?: number;
  team_id?: number;
}
