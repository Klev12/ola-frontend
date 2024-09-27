import { useMutation, useQuery } from "react-query";
import {
  createTeam,
  getAllTeams,
  updateTeam,
} from "../../services/team-service";
import { Outlet, useNavigate, useParams } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { TeamGetDto } from "../../models/team";
import ROUTES from "../../consts/routes";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import useGlobalState from "../../store/store";
import CollaboratorLinkList from "./components/CollaboratorLinkList";
import { Tag } from "primereact/tag";
import { OverlayPanel } from "primereact/overlaypanel";
import { Paginator } from "primereact/paginator";
import { UserArea } from "../../models/user";

interface TeamContextProps {
  team?: TeamGetDto;
}

export const TeamContext = createContext<TeamContextProps>({});

const Team = () => {
  const { id: teamIdParam } = useParams();

  const authenticatedUser = useGlobalState((state) => state.user);

  const showTeamDialog = useToggle();
  const showCollaboratorLinksDialog = useToggle();

  const [page, setCurrentPage] = useState(0);

  const { data: teamsData, refetch: refetchTeams } = useQuery({
    queryFn: () =>
      getAllTeams({ page: page + 1, limit: 5, area: UserArea.commercial }).then(
        (res) => res.data
      ),
    queryKey: ["teams-data", page],
  });

  const { mutate: createTeamMutate, isLoading: isCreatingTeam } = useMutation(
    createTeam,
    {
      onSuccess: () => {
        refetchTeams();
        showTeamDialog.setFalse();
      },
    }
  );
  const { mutate: updateTeamMutate, isLoading: isUpdatingTeam } = useMutation(
    updateTeam,
    {
      onSuccess: () => {
        refetchTeams();
        showTeamDialog.setFalse();
      },
    }
  );

  const [selectedTeam, setSelectedTeam] = useState<TeamGetDto>(
    {} as TeamGetDto
  );

  const navigate = useNavigate();

  const teamId = useMemo(
    () =>
      teamsData?.teams?.find((team) => team.userId === authenticatedUser?.id)
        ?.id,
    [teamsData]
  );

  const myTeam = useMemo(
    () =>
      teamsData?.teams?.find((team) => team.userId === authenticatedUser?.id),
    [teamsData, authenticatedUser]
  );

  const [currentTeam, setCurrentTeam] = useState<TeamGetDto>();

  const menuRight = useRef<OverlayPanel>(null);

  useEffect(() => {
    setCurrentTeam(
      teamsData?.teams.find((team) => team.id === Number(teamIdParam))
    );
  }, [teamsData, teamIdParam]);

  return (
    <TeamContext.Provider value={{ team: currentTeam || selectedTeam }}>
      {teamsData?.teams.filter((team) => team.userId === authenticatedUser?.id)
        .length !== 0 && (
        <Button
          label="Agregar colaborador"
          onClick={() => showCollaboratorLinksDialog.setTrue()}
        />
      )}
      {teamsData?.teams.filter((team) => team.userId === authenticatedUser?.id)
        .length !== 0 && (
        <Dialog
          style={{ width: "50vw" }}
          draggable={false}
          visible={showCollaboratorLinksDialog.value}
          onHide={() => showCollaboratorLinksDialog.setFalse()}
        >
          <CollaboratorLinkList />
        </Dialog>
      )}

      <Button
        label={
          teamsData?.teams.filter(
            (team) => team.userId === authenticatedUser?.id
          ).length !== 0
            ? "Actualizar nombre"
            : "Crear grupo"
        }
        outlined
        onClick={() => showTeamDialog.setTrue()}
        loading={isCreatingTeam || isUpdatingTeam}
      />
      <Dialog
        draggable={false}
        visible={showTeamDialog.value}
        onHide={() => showTeamDialog.setFalse()}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );
            if (
              teamsData?.teams.filter(
                (team) => team.userId === authenticatedUser?.id
              ).length !== 0
            ) {
              updateTeamMutate({
                name: formData["name"].toString(),
                teamId: teamId as number,
              });
              return;
            }

            createTeamMutate({
              name: formData["name"].toString(),
              userId: authenticatedUser?.id as number,
            });
          }}
        >
          <label htmlFor="">Nombre de grupo</label>
          <InputText
            defaultValue={myTeam?.name}
            placeholder="nombre de grupo"
            name="name"
          />
          <Button
            label={
              teamsData?.teams.length !== 0
                ? "Actualizar nombre"
                : "Crear grupo"
            }
            loading={isCreatingTeam || isUpdatingTeam}
          />
        </form>
      </Dialog>

      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <DataTable
            style={{ width: "200px" }}
            header="Equipos Ola"
            value={teamsData?.teams}
            emptyMessage="No hay equipo disponible."
            selection={selectedTeam}
            selectionMode="single"
            onSelectionChange={(e) => {
              setSelectedTeam(e.value);

              if (!e.value) {
                return;
              }

              navigate(ROUTES.SALES.TEAM_USERS_ID(String(e.value.id)));
            }}
          >
            <Column header="Nombre" field="name" />
            <Column
              header="Creado por"
              body={(value: TeamGetDto) => (
                <>
                  <Button
                    outlined
                    label="detalles"
                    onClick={(event) => {
                      setSelectedTeam(value);
                      menuRight?.current?.toggle(event);
                    }}
                  />
                  <OverlayPanel ref={menuRight}>
                    <p>Nombre: {selectedTeam?.userFullname}</p>
                    <p>
                      Código: <Tag value={selectedTeam?.userCode} />
                    </p>
                  </OverlayPanel>
                </>
              )}
            />
          </DataTable>
          <Paginator
            first={page === 0 ? page : page + 5}
            rows={5}
            totalRecords={teamsData?.count}
            onPageChange={(e) => {
              setCurrentPage(e.page);
            }}
          />
        </div>

        <Outlet />
      </div>
    </TeamContext.Provider>
  );
};

export default Team;
