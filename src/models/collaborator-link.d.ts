import { UserArea } from "./user";

export interface CollaboratorLinkGetDto {
  id?: number;
  token: string;
  userId?: number;
  used: boolean;
}

export interface CollaboratorLinkDataGetDto {
  user: {
    code: string;
    area: UserArea;
  };
  team: {
    name: string;
  };
}
