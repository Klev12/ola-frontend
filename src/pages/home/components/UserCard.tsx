import { Panel } from "primereact/panel";
import { ToggleButton } from "primereact/togglebutton";
import { UserGetDto } from "../../../models/user";
import useToggle from "../../../hooks/useToggle";
import { toggleAccessUser } from "../../../services/user-service";

interface UserCardProps {
  user: UserGetDto;
  notificationMode: boolean;
}

const UserCard = ({ user, notificationMode = false }: UserCardProps) => {
  const { value } = useToggle(user.has_access);

  return (
    <Panel
      header={user.fullname}
      toggleable
      collapsed
      icons={
        <i
          className="pi pi-user"
          style={{ marginRight: "0.2em" }}
          title="User Icon"
        ></i>
      }
    >
      <div>{user.email}</div>
      <div>{user.area}</div>
      <div>{user.role}</div>
      {notificationMode && (
        <>
          {" "}
          <ToggleButton
            disabled={user.has_access}
            checked={value}
            onLabel="Si"
            onIcon="pi pi-check"
            onChange={async () => {
              if (!value) {
                await toggleAccessUser(true, user.id as number);
              }
            }}
          />
          <ToggleButton
            disabled={user.has_access}
            checked={value}
            invalid
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            onChange={async () => {
              if (!value) {
                await toggleAccessUser(false, user.id as number);
              }
            }}
          />
        </>
      )}
    </Panel>
  );
};

export default UserCard;
