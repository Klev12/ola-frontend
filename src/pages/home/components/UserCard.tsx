import { Panel } from "primereact/panel";
import { Roles, UserGetDto } from "../../../models/user";
import { changeRole } from "../../../services/user-service";
import { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import ROUTES from "../../../consts/routes";

interface UserCardProps {
  user: UserGetDto;
  notificationMode: boolean;
}

const UserCard = ({ user, notificationMode = false }: UserCardProps) => {
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "El cambio de rol ha sido exitoso",
      life: 3000,
    });
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
    </Panel>
  );
};

export default UserCard;
