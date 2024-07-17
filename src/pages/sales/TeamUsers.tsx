import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getUsersFromTeam } from "../../services/team-service";
import { Card } from "primereact/card";

const TeamUsers = () => {
  const { id } = useParams();

  const { data: teamUsersData, isFetching } = useQuery({
    queryFn: () => getUsersFromTeam(Number(id)).then((res) => res.data),
    queryKey: ["team-users", id],
  });

  return (
    <div>
      {isFetching && <div>cargando...</div>}
      {teamUsersData?.users.map((user) => {
        return <Card title={user.fullname}></Card>;
      })}
    </div>
  );
};

export default TeamUsers;
