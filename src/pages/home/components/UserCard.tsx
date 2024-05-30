import { Panel } from "primereact/panel";
import { ToggleButton } from "primereact/togglebutton";
import { Roles, UserGetDto } from "../../../models/user";
import { changeRole, toggleAccessUser } from "../../../services/user-service";
import { useState } from "react";

interface UserCardProps {
  user: UserGetDto;
  notificationMode: boolean;
}

const UserCard = ({ user, notificationMode = false }: UserCardProps) => {
  const [accept, setAccept] = useState<boolean>(false);
  const [reject, setReject] = useState<boolean>(false);

  const handleAccept = async () => {
    if (!accept) {
      await toggleAccessUser(true, user.id as number);
      setAccept(true);
      setReject(false);
    }
  };

  const handleReject = async () => {
    if (!reject) {
      await toggleAccessUser(false, user.id as number);
      setAccept(false);
      setReject(true);
    }
  };

  return (
    <Panel header={user.fullname} toggleable collapsed>
      <div>{user.email}</div>
      <div>{user.area}</div>
      <div>
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
          <select name="role" id="">
            {Object.values(Roles).map((role) => (
              <option>{role}</option>
            ))}
          </select>
          <button>cambiar role</button>
        </form>
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
