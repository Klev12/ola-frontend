export interface ServiceGetDto {
  id: number;
  title: string;
  type: ServiceType;
  contractId: number;
}

export interface ServicePostDto {
  title: string;
  type: ServiceType;
}

export interface ServiceOptionGetDto {
  id: number;
  title: string;
  description: string;
  html: string;
  price: string;
  serviceId: number;
}

export interface ServiceOptionPostDto {
  title: string;
  description: string;
  html: string;
  price: string;
  serviceId: number;
}

export enum ServiceType {
  normal = "normal",
  plans = "plans",
}
