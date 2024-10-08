import { useQuery } from "react-query";
import { Outlet, useNavigate, useParams } from "react-router";
import { getUsersFromTeam } from "../../services/team-service";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useContext, useState } from "react";
import { UserGetDto } from "../../models/user";
import ROUTES from "../../consts/routes";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { TeamContext } from "./Team";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import TeamTransactionSummary from "./components/TeamTransactionSummary";

const TeamUsers = () => {
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const showTeamDialog = useToggle();
  const { team } = useContext(TeamContext);

  const { data: teamUsersData } = useQuery({
    queryFn: () =>
      getUsersFromTeam({
        teamId: Number(id),
        page: currentPage + 1,
        limit: 10,
      }).then((res) => res.data),
    queryKey: ["team-users", id, currentPage],
  });

  const [selectedUser, setSelectedUser] = useState<{ user: UserGetDto }>({
    user: {} as UserGetDto,
  });

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div>
        <DataTable
          header="Usuarios"
          isDataSelectable={(value) => {
            return value.data?.user.has_access;
          }}
          rowClassName={(data) => {
            return data.user.has_access ? "" : "p-disabled";
          }}
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
          emptyMessage="No hay usuarios"
        >
          <Column field="user.fullname" header="Nombre"></Column>
          <Column field="user.code" header="Código"></Column>
          <Column field="user.role" header="Rol"></Column>
        </DataTable>
        <Button
          label="Ver detalles de grupo"
          onClick={() => showTeamDialog.setTrue()}
        />
        <Dialog
          style={{ width: "50vw" }}
          draggable={false}
          header={`Equipo: ${team?.name}`}
          visible={showTeamDialog.value}
          onHide={() => showTeamDialog.setFalse()}
        >
          <TeamTransactionSummary team={team} />
        </Dialog>
        <Paginator
          first={currentPage === 0 ? currentPage : currentPage + 10}
          rows={10}
          onPageChange={(e) => {
            setCurrentPage(e.page);
          }}
          totalRecords={teamUsersData?.teamUsers.length}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default TeamUsers;
