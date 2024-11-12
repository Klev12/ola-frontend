export interface PaypalLinkDto {
  href: string;
  rel: PaypalRel;
  method: string;
}

export enum PaypalRel {
  self = "self",
  approve = "approve",
  update = "update",
  capture = "capture",
}
