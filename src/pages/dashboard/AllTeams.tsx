import { useQuery } from "react-query";
import { getAllTeams } from "../../services/team-service";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useState } from "react";
import PaginatorPage from "../../components/PaginatorPage";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { UserGetDto } from "../../models/user";

const AllTeams = () => {
  const [page, setPage] = useState(1);

  const { data: teamsData } = useQuery({
    queryFn: () => getAllTeams({ page }).then((res) => res.data),
    queryKey: ["teams-data", page],
  });

  const navigate = useNavigate();

  return (
    <div>
      {teamsData?.teams.map((team) => {
        return (
          <Card key={team.id}>
            <h2>{team.name}</h2>
            <Tag severity={"info"} value={`área: ${team.area}`} />
            <div>
              <span>Creado por:</span>
              <span>
                {" "}
                {team.userFullname} <Tag value={team.userCode} />
              </span>
            </div>
            <Button
              label="Ver usuarios"
              onClick={() => {
                navigate(ROUTES.DASHBOARD.USER_TEAMS_ID(team.id as number), {
                  state: {
                    id: team.userId,
                    fullname: team.userFullname,
                    code: team.userCode,
                  } as Partial<UserGetDto>,
                });
              }}
            />
          </Card>
        );
      })}
      <PaginatorPage
        limit={10}
        total={teamsData?.count}
        onPage={(page) => setPage(page + 1)}
      />
    </div>
  );
};

export default AllTeams;
