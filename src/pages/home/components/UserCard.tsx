import { Panel } from "primereact/panel";
import { ToggleButton } from "primereact/togglebutton";
import { UserGetDto } from "../../../models/user";
import useToggle from "../../../hooks/useToggle";
import { toggleAccessUser } from "../../../services/user-service";
import { useState } from "react";

interface UserCardProps {
  user: UserGetDto;
  notificationMode: boolean;
}

const UserCard = ({ user, notificationMode = false }: UserCardProps) => {
  const { value, toggle } = useToggle(user.has_access);
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
      <div>Correo: {user.email}</div>
      <div>Area: {user.area}</div>
      <div>Rol: {user.role}</div>
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
