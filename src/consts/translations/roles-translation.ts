import { Roles } from "../../models/user";

const translatedRoles: { [key in Roles]: string } = {
  [Roles.admin]: "Administración",
  [Roles.sales]: "Vendedor (c/c)",
  [Roles.collaborator]: "Vendedor (s/c)",
  [Roles.generalAdmin]: "Jefe General",
  [Roles.groupAdmin]: "Jefe de Grupo",
  [Roles.secretary]: "Secretaría",
  [Roles.user]: "Usuario",
};

export default translatedRoles;
