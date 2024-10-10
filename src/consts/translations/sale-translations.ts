import { SaleCommercialCost, SaleMemberShip } from "../../models/sale";

export const translatedCommercialCost: { [key in SaleCommercialCost]: string } =
  {
    "institutional-agreement": "Convenio institucional",
    "promotional-cost": "Costo promocional",
    "reffered-benefit": "Beneficio referido",
    commercial: "Costo comercial",
  };

export const translatedMembership: { [key in SaleMemberShip]: string } = {
  none: "ninguno",
  month: "mensual",
  "6-month": "6 meses",
  "12-month": "12 meses",
};
