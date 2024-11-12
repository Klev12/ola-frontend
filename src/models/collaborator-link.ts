import { Roles, UserArea } from "./user";

export interface CollaboratorLinkGetDto {
  id?: number;
  token: string;
  userId?: number;
  used: boolean;
  type: MemberLinkType;
}

export interface DecodedLinkToken {
  ownerId: number;
  ownerCode: string;
  memberRole: Roles;
  teamId: number;
  teamName: string;
  type: MemberLinkType;
  iat: number;
  exp: number;
}

export enum MemberLinkType {
  normal = "normal",
  collaborator = "collaborator",
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
