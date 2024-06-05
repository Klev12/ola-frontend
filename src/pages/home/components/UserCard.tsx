import { Panel } from "primereact/panel";
import { ToggleButton } from "primereact/togglebutton";
import { Roles, UserGetDto } from "../../../models/user";
import {
  changeRole,
  deleteUserById,
  toggleAccessUser,
} from "../../../services/user-service";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface UserCardProps {
  user: UserGetDto;
  notificationMode: boolean;
}

const UserCard = ({ user, notificationMode = false }: UserCardProps) => {
  const [accept, setAccept] = useState<boolean>(false);
  const [reject, setReject] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "El cambio de rol ha sido exitoso",
      life: 3000,
    });
  };

  const handleAccept = async () => {
    if (!accept) {
      await toggleAccessUser(true, user.id as number);
      setAccept(true);
      setReject(false);
    }
  };

  const handleReject = async () => {
    if (!reject) {
      await deleteUserById(user.id);
      setAccept(false);
      setReject(true);
    }
  };

  return (
    <Panel header={user.fullname} toggleable collapsed>
      <div>Email: {user.email}</div>
      <div>Area: {user.area}</div>
      <div style={{ gap: "0.5rem" }}>
        verificación:
        {user.verified
          ? "el usuario está verificado"
          : "el usuario no está verificado"}
        <Button label="Verificar formulario" />
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
                .map((role) => (
                  <option>{role}</option>
                ))}
            </select>
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
          </form>
        )}
      </div>
      {notificationMode && (
        <>
          <ToggleButton
            checked={accept}
            onLabel="Aceptar"
            offLabel="Aceptar"
            onIcon="pi pi-check"
            offIcon="pi pi-check"
            onChange={handleAccept}
          />
          <ToggleButton
            checked={reject}
            onLabel="Rechazar"
            offLabel="Rechazar"
            onIcon="pi pi-ban"
            offIcon="pi pi-ban"
            onChange={handleReject}
          />
        </>
      )}
    </Panel>
  );
};

export default UserCard;
