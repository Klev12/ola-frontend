import { Roles } from "../../models/user";

const translatedRoles: { [key in Roles]: string } = {
  [Roles.admin]: "Gerencia general",
  [Roles.sales]: "Vendedor (c/c)",
  [Roles.collaborator]: "Vendedor (s/c)",
  [Roles.generalAdmin]: "Jefe General Comercial",
  [Roles.groupAdmin]: "Jefe de Grupo",
  [Roles.secretary]: "Secretaría",
  [Roles.user]: "Usuario",
};

export default translatedRoles;
