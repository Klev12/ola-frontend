export interface PaypalLinkDto {
  href: string;
  rel: PaypalRel;
  method: string;
}

export enum PaypalRel {
  self = "self",
  approve = "approve",
  payerAction = "payer-action",
  update = "update",
  capture = "capture",
}
