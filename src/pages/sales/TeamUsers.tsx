import { useQuery } from "react-query";
import { Outlet, useNavigate, useParams } from "react-router";
import { getUsersFromTeam } from "../../services/team-service";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { UserGetDto } from "../../models/user";
import ROUTES from "../../consts/routes";

const TeamUsers = () => {
  const { id } = useParams();

  const { data: teamUsersData } = useQuery({
    queryFn: () => getUsersFromTeam(Number(id)).then((res) => res.data),
    queryKey: ["team-users", id],
  });

  const [selectedUser, setSelectedUser] = useState<{ user: UserGetDto }>({
    user: {} as UserGetDto,
  });

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <DataTable
        header="Usuarios"
        value={teamUsersData?.teamUsers}
        tableStyle={{ minWidth: "10rem" }}
        onCellClick={(value) => {
          console.log(value);
        }}
        selectionMode="single"
        selection={selectedUser}
        onSelectionChange={(e) => {
          setSelectedUser(e.value);
          if (!e.value) {
            return;
          }
          navigate(
            ROUTES.SALES.TRANSACTIONS_USER_ID(
              Number(id),
              e.value.user.id as number
            )
          );
        }}
      >
        <Column field="user.fullname" header="Nombre"></Column>
        <Column field="user.code" header="Código"></Column>
        <Column field="user.role" header="Rol"></Column>
      </DataTable>
      <Outlet />
    </div>
  );
};

export default TeamUsers;
