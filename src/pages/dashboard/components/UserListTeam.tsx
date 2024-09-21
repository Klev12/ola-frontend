import { useMutation, useQuery } from "react-query";
import { TeamGetDto } from "../../../models/team";
import { getAllUsers } from "../../../services/user-service";
import { UserArea, UserGetDto } from "../../../models/user";
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
import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import useGlobalState from "../../../store/store";
import PaginatorPage from "../../../components/PaginatorPage";
import { AxiosError } from "axios";

interface UserListTeamProps {
  team?: TeamGetDto;
  visible: boolean;
  onHide: () => void;
}

const UserListTeam = ({ team, visible, onHide }: UserListTeamProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const toast = useRef<Toast>(null);

  const [currentPageUser, setCurrenPageUser] = useState(0);
  const [currentPageTeamUser, setCurrenPageTeamUser] = useState(0);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const { data: usersData } = useQuery({
    queryFn: () =>
      getAllUsers({
        area: team?.area as UserArea,
        access: true,
        page: currentPageUser + 1,
        limit: 5,
        keyword,
      }).then((res) => res.data),
    queryKey: ["user-team", team?.id, currentPageUser, keyword],
  });

  const { data: usersFromTeamData, refetch: refetchUsersFromTeam } = useQuery({
    queryFn: () =>
      getUsersFromTeam({
        teamId: team?.id as number,
        page: currentPageTeamUser + 1,
      }).then((res) => res.data),
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
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      const message = error.response?.data?.error?.message;
      toast.current?.show({
        severity: "error",
        detail: message,
      });
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
      <Dialog
        style={{ minHeight: "400px", minWidth: "400px" }}
        visible={visible}
        onHide={onHide}
        draggable={false}
      >
        <form
          className="p-inputgroup flex-1"
          style={{ width: "30vw" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );
            setKeyword(formData["keyword"].toString());
          }}
        >
          <InputText placeholder="Nombre, código, email" name="keyword" />
          <Button icon="pi pi-search" />
        </form>
        <DataTable
          value={
            usersData?.users.filter(
              (user) => user.id !== authenticatedUser?.id
            ) || []
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

        <PaginatorPage
          limit={5}
          total={usersData?.count}
          onPage={(page) => {
            setCurrenPageUser(page);
          }}
        />
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
      <PaginatorPage
        limit={10}
        total={usersFromTeamData?.count}
        onPage={(page) => {
          setCurrenPageTeamUser(page);
        }}
      />
    </>
  );
};

export default UserListTeam;
