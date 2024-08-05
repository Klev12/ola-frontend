import { useQuery } from "react-query";
import { getAllTeams } from "../../services/team-service";
import { Outlet, useNavigate } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { TeamGetDto } from "../../models/team";
import ROUTES from "../../consts/routes";

const Team = () => {
  const { data: teamsData } = useQuery({
    queryFn: () => getAllTeams({}).then((res) => res.data),
    queryKey: ["teams-data"],
  });

  const [selectedTeam, setSelectedTeam] = useState<TeamGetDto>(
    {} as TeamGetDto
  );

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <DataTable
        header="Equipos"
        value={teamsData?.teams}
        emptyMessage="No hay Equipos disponibles, el usuario Administrador o secretario debe asignarte un equipo."
        selection={selectedTeam}
        selectionMode="single"
        onSelectionChange={(e) => {
          setSelectedTeam(e.value);
          console.log(e.value);
          if (!e.value) {
            return;
          }

          navigate(ROUTES.SALES.TEAM_USERS_ID(String(e.value.id)));
        }}
      >
        <Column header="Nombre" style={{ width: "200px" }} field="name" />
      </DataTable>
      <Outlet />
    </div>
  );
};

export default Team;
