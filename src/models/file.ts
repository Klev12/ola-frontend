export interface FileGetDto {
  id?: string | number;
  hash: string;
  form_id?: string | number;
  type: FileType;
}

export enum FileType {
  cardId = "card_id",
  photo = "photo",
}

export interface FileDocument {
  id: number;
  url: string;
  identifier: string;
  status: "pendiente" | "completado";
  fileData?: File;
}
