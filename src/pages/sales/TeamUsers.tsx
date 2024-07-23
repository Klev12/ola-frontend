import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getUsersFromTeam } from "../../services/team-service";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TeamUsers = () => {
  const { id } = useParams();

  const { data: teamUsersData } = useQuery({
    queryFn: () => getUsersFromTeam(Number(id)).then((res) => res.data),
    queryKey: ["team-users", id],
  });

  return (
    <div>
      <DataTable
        value={teamUsersData?.users}
        tableStyle={{ minWidth: "10rem" }}
      >
        <Column field="fullname" header="Nombre"></Column>
        <Column field="code" header="Código"></Column>
        <Column field="role" header="Rol"></Column>
        <Column field="quantity" header="Ventas"></Column>
      </DataTable>
    </div>
  );
};

export default TeamUsers;
