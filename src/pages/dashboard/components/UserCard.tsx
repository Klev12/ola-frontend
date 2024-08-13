import React, { useRef } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useMutation, useQuery } from "react-query";
import ROUTES from "../../../consts/routes";
import useGlobalState from "../../../store/store";
import { Roles, UserGetDto } from "../../../models/user";
import { changeRole, deleteUserById } from "../../../services/user-service";
import { Tag } from "primereact/tag";

interface UserCardProps {
  user: UserGetDto;
  notificationMode?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  notificationMode = false,
}) => {
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "El cambio de rol ha sido exitoso",
      life: 3000,
    });
  };

  const { refetch } = useQuery({ queryKey: ["users"] });
  const { mutate: deleteUserByIdMutate } = useMutation(deleteUserById, {
    onSuccess: () => {
      refetch();
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "El usuario ha sido eliminado",
        life: 3000,
      });
    },
  });

  const athenticatedUser = useGlobalState((state) => state.user);

  const confirmDelete = () => {
    confirmDialog({
      message: "¿Estás seguro de que quieres eliminar este usuario?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      draggable: false,
      accept: () => deleteUserByIdMutate(user.id),
      reject: () => {
        toast.current?.show({
          severity: "info",
          summary: "Cancelado",
          detail: "La eliminación del usuario ha sido cancelada",
          life: 3000,
        });
      },
    });
  };

  const navigate = useNavigate();

  return (
    <Panel
      header={
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>{user.fullname}</span>
          <Tag severity="info" value={user.code} />
          {(user.role === Roles.groupAdmin ||
            user.role === Roles.generalAdmin) && (
            <Tag
              value="ver grupo"
              onClick={() => {
                navigate(ROUTES.DASHBOARD.USER_TEAMS_ID(user.id), {
                  state: user,
                });
              }}
            />
          )}
        </div>
      }
      toggleable
      collapsed
    >
      <Toast ref={toast} />
      <ConfirmDialog />
      {user.role !== Roles.admin &&
        athenticatedUser?.role !== Roles.secretary && <></>}

      <div>Email: {user.email}</div>
      <div>Area: {user.area}</div>
      <div style={{ gap: "0.5rem" }}>
        verificación:
        {user.verified
          ? "el usuario está verificado"
          : "el usuario no está verificado"}
        <Link target="_blank" to={ROUTES.DASHBOARD.CHECK_USER_FORM_ID(user.id)}>
          Revisar formulario
        </Link>
      </div>
      <div>
        {user.role !== Roles.admin && !notificationMode && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(
                new FormData(e.target as HTMLFormElement)
              );
              changeRole(formData["role"] as Roles, user.id);
            }}
          >
            <span>role: {user.role}</span>
            <select name="role" defaultValue={user.role} style={{}}>
              {Object.values(Roles)
                .filter((role) => role !== Roles.admin)
                .map((role, index) => {
                  switch (role) {
                    case Roles.groupAdmin:
                      return (
                        <option key={index} value={role}>
                          Jefe de grupo
                        </option>
                      );
                    case Roles.sales:
                      return (
                        <option key={index} value={role}>
                          Ventas
                        </option>
                      );
                    case Roles.secretary:
                      return (
                        <option key={index} value={role}>
                          Sub admin
                        </option>
                      );
                    case Roles.user:
                      return (
                        <option key={index} value={role}>
                          Usuario
                        </option>
                      );
                    case Roles.generalAdmin:
                      return (
                        <option key={index} value={role}>
                          Admin general
                        </option>
                      );
                  }
                })}
            </select>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                label="Cambiar Rol"
                onClick={showSuccess}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "purple",
                  border: "0",
                  height: "10px",
                }}
              />
              <Button
                style={{
                  backgroundColor: "red",
                  border: 0,
                  boxShadow: "none",
                }}
                rounded
                label="Eliminar usuario"
                onClick={confirmDelete}
              />
            </div>
          </form>
        )}
      </div>
    </Panel>
  );
};

export default UserCard;
