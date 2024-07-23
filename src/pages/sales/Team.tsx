import { useQuery } from "react-query";
import { getAllTeams } from "../../services/team-service";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router";
import ROUTES from "../../consts/routes";

const Team = () => {
  const { data: teamsData } = useQuery({
    queryFn: getAllTeams,
    queryKey: ["teams-data"],
  });

  const navigate = useNavigate();

  const items: MenuItem[] | undefined = useMemo(() => {
    return teamsData?.data.teams.map((team) => ({
      data: team.id,
      label: team.name,
      icon: "",
      command: (data) => {
        navigate(ROUTES.SALES.TEAM_USERS_ID(data.item.data));
      },
    }));
  }, [teamsData]);

  return (
    <div style={{ display: "flex" }}>
      <Menu model={items} />
      <Outlet />
    </div>
  );
};

export default Team;
