export interface RegulationGetDto {
  id?: number;
  title: string;
  description: string;
  seen?: boolean | null;
  userId?: number | null;
  html: string;
}

export interface RegulationMarkAsSeenDto {
  regulationId: number;
}

export interface RegulationPatchDto {
  title?: string;
  description?: string;
  regulationId: number;
  html?: string;
}

export interface RegulationPostDto {
  title: string;
  description: string;
  html: string;
}
