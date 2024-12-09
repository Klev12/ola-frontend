import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../FilterElement";
import ShowElementList from "../ShowElementList";
import teamService from "../../../services/team-service";
import { DataTable } from "primereact/datatable";
import { TeamGetDto } from "../../../models/team";
import { Column } from "primereact/column";
import useToggle from "../../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { PrimeIcons } from "primereact/api";
import { UserArea } from "../../../models/user";

const TeamFilter = () => {
  const { setParams, params, removeAllFilter } = useContext(FilterContext);

  const showTeamList = useToggle();
  const [selectedTeam, setSelectedTeam] = useState<TeamGetDto | undefined>(
    undefined
  );

  useEffect(() => {
    if (removeAllFilter) {
      setSelectedTeam(undefined);
    }
  }, [removeAllFilter]);

  return (
    <div>
      <Card>
        {selectedTeam && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span>{selectedTeam?.name}</span>
            <Tag style={{ width: "fit-content" }} value={selectedTeam?.area} />
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            label="Fitrar por equipo"
            onClick={() => showTeamList.setTrue()}
          />
          <Button
            outlined
            style={{ position: "relative", right: "0" }}
            size="small"
            rounded
            icon={PrimeIcons.TIMES}
            onClick={() => {
              setSelectedTeam(undefined);
              setParams({ ...params, teamId: null });
            }}
          />
        </div>
      </Card>
      <Dialog
        draggable={false}
        visible={showTeamList.value}
        header="Equipos"
        onHide={() => showTeamList.setFalse()}
        style={{ width: "90vw", maxWidth: "700px", minWidth: "200px" }}
      >
        <ShowElementList
          expanded={true}
          params={{ values: { area: UserArea.commercial } }}
          url={teamService.api.base}
          allElement={(teams: TeamGetDto[]) => (
            <DataTable value={teams}>
              <Column header="Nombre" field="name" />
              <Column header="Creado por" field="userFullname" />
              <Column header="Código de creador" field="userCode" />
              <Column header="Área" field="area" />
              <Column
                header="Filtrar"
                body={(team: TeamGetDto) => (
                  <Button
                    icon={PrimeIcons.FILTER}
                    onClick={() => {
                      setSelectedTeam(team);
                      setParams({ ...params, teamId: team.id });
                      showTeamList.setFalse();
                    }}
                  />
                )}
              />
            </DataTable>
          )}
        />
      </Dialog>
    </div>
  );
};

export default TeamFilter;
