import { Roles } from "../../models/user";

const translatedRoles: { [key in Roles]: string } = {
  [Roles.admin]: "Administración",
  [Roles.collaborator]: "Colaborador",
  [Roles.generalAdmin]: "Jefe General",
  [Roles.groupAdmin]: "Jefe de Grupo",
  [Roles.sales]: "Vendedor",
  [Roles.secretary]: "Secretaría",
  [Roles.user]: "Usuario",
};

export default translatedRoles;
