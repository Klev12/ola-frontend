import { SalePaymentStatus } from "../../../models/sale";

export const statusPayment: {
  [key in SalePaymentStatus]: "danger" | "success" | "info" | "warning";
} = {
  [SalePaymentStatus.cancelled]: "danger",
  [SalePaymentStatus.checking]: "warning",
  [SalePaymentStatus.paid]: "success",
  [SalePaymentStatus.pending]: "info",
};
