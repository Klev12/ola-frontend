import { LevelGetDto } from "./level";

export interface Collaborator {
  id: number;
  user_id: number;
  collaborator_id: number;
  user: CollaboratorUser;
}

export interface CollaboratorUser {
  fullname: string;
  code: string;
  collaborators?: Collaborator[];
  level?: LevelGetDto;
}
