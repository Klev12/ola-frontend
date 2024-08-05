import { useMutation, useQuery } from "react-query";
import { TeamGetDto } from "../../../models/team";
import { getAllUsers } from "../../../services/user-service";
import { Roles, UserArea, UserGetDto } from "../../../models/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import {
  assignUserToTeam,
  getUsersFromTeam,
  removeUserFromTeam,
} from "../../../services/team-service";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface UserListTeamProps {
  team?: TeamGetDto;
  visible: boolean;
  onHide: () => void;
}

const UserListTeam = ({ team, visible, onHide }: UserListTeamProps) => {
  const toast = useRef<Toast>(null);

  const { data: usersData } = useQuery({
    queryFn: () =>
      getAllUsers({ area: team?.area as UserArea, access: true }).then(
        (res) => res.data
      ),
    queryKey: ["user-team", team?.id],
  });

  const { data: usersFromTeamData, refetch: refetchUsersFromTeam } = useQuery({
    queryFn: () => getUsersFromTeam(team?.id as number).then((res) => res.data),
    queryKey: ["users-from-team", team?.id],
  });

  const { mutate: assignUserToTeamMutate } = useMutation(assignUserToTeam, {
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        detail: "El usuario fue agregado al equipo",
      });
      refetchUsersFromTeam();
    },
  });

  const { mutate: removeUserFromTeamMutate } = useMutation(removeUserFromTeam, {
    onSuccess: () => {
      refetchUsersFromTeam();
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <Dialog visible={visible} onHide={onHide} draggable={false}>
        <DataTable
          value={
            usersData?.users.filter((user) => user.role !== Roles.groupAdmin) ||
            []
          }
        >
          <Column header="Nombre" field="fullname" />
          <Column header="Rol" field="role" />
          <Column header="Código" field="code" />
          <Column
            header="Estado"
            body={(value: UserGetDto) => (
              <Button
                icon={PrimeIcons.USER_PLUS}
                onClick={() => {
                  assignUserToTeamMutate({
                    userId: value.id as number,
                    teamId: team?.id as number,
                  });
                }}
              />
            )}
          />
        </DataTable>
      </Dialog>
      <DataTable
        value={usersFromTeamData?.teamUsers}
        emptyMessage="No hay usuarios en este grupo"
      >
        <Column header="Nombre" field="user.fullname" />
        <Column header="Rol" field="user.role" />
        <Column header="Area" field="user.area" />
        <Column header="code" field="user.code" />
        <Column
          header="Opción"
          body={(value) => (
            <Button
              severity="danger"
              icon={PrimeIcons.USER_MINUS}
              onClick={() => removeUserFromTeamMutate(value.id)}
            />
          )}
        />
      </DataTable>
    </>
  );
};

export default UserListTeam;
