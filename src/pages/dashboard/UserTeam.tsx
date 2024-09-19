import { useLocation } from "react-router";
import { UserGetDto } from "../../models/user";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import GoBackButton from "../../components/GoBackButton";
import { useMutation, useQuery } from "react-query";
import {
  createTeam,
  deleteTeamById,
  getAllTeams,
} from "../../services/team-service";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";
import UserListTeam from "./components/UserListTeam";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Tag } from "primereact/tag";

const UserTeam = () => {
  const location = useLocation();
  const user = location.state as UserGetDto;

  const { data: teamsData, refetch } = useQuery({
    queryFn: () =>
      getAllTeams({ userId: user.id as number }).then((res) => res.data),
  });

  const { mutate: createTeamMutate, isLoading: isCreatingTeam } = useMutation(
    createTeam,
    {
      onSuccess: () => {
        createTeamDialog.setFalse();
        refetch();
      },
    }
  );

  const { mutate: deleteTeamByIdMutate } = useMutation(deleteTeamById, {
    onSuccess: () => {
      refetch();
    },
  });

  const createTeamDialog = useToggle();
  const showUserList = useToggle();

  return (
    <>
      <GoBackButton />
      <Card title={`Usuario ${user.fullname} ${user.code}`}>
        {teamsData?.teams?.length === 0 && (
          <Button
            label="Crear grupo"
            onClick={() => createTeamDialog.setTrue()}
          />
        )}
        <Dialog
          visible={createTeamDialog.value}
          onHide={() => createTeamDialog.setFalse()}
          draggable={false}
          header={`${user.fullname} ${user.code}`}
        >
          <form
            action=""
            style={{ display: "grid", gap: 20 }}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(
                new FormData(e.target as HTMLFormElement)
              );
              createTeamMutate({
                name: formData["name"].toString(),
                userId: user.id as number,
              });
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label htmlFor="">Nombre de grupo: </label>
              <InputText
                defaultValue={user.fullname}
                required
                placeholder="Grupo uno"
                name="name"
              />
            </div>
            <Button
              label="Crear grupo"
              loading={isCreatingTeam}
              disabled={isCreatingTeam}
            />
          </form>
        </Dialog>
        <div className="card xl:flex xl:justify-content-center">
          {teamsData?.teams?.map((team) => {
            return (
              <div
                key={team.id}
                className="flex flex-wrap p-2 align-items-center gap-3"
              >
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                  <p className="font-bold">{team.name}</p>
                  <Tag value={team.area} />
                  <div className="flex align-items-center gap-2">
                    <Button
                      label="Añadir usuarios"
                      outlined
                      icon={PrimeIcons.PLUS}
                      onClick={() => showUserList.setTrue()}
                    />
                    <Button
                      label="Eliminar grupo"
                      onClick={() => {
                        confirmDialog({
                          message: "¿Estás seguro de eliminar el grupo?",
                          acceptLabel: "Sí",
                          accept: () => {
                            deleteTeamByIdMutate({ id: team.id as number });
                          },
                        });
                      }}
                    />
                    <ConfirmDialog draggable={false} />

                    <UserListTeam
                      team={team}
                      visible={showUserList.value}
                      onHide={() => showUserList.setFalse()}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default UserTeam;
