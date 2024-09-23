import { useMutation, useQuery } from "react-query";
import {
  deleteUserById,
  getAllUsers,
  toggleAccessUser,
} from "../../services/user-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import formatDate from "../../utils/format-date";
const PendingUsers = () => {
  const { data, refetch } = useQuery({
    queryFn: () => getAllUsers({ access: false }),
    queryKey: ["peding-users"],
    refetchOnMount: true,
    refetchInterval: 20000,
  });

  const { mutate: toggleAccessUserMutate } = useMutation(
    ({ access, userId }: { access: boolean; userId: number }) =>
      toggleAccessUser(access, userId),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deleteUserByIdMutate } = useMutation(deleteUserById, {
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: getAllUsersMutate, data: userData } =
    useMutation(getAllUsers);

  useEffect(() => {
    getAllUsersMutate({ access: false });
  }, []);

  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div
      style={{
        padding: "1rem",
        overflowY: "auto",
        height: "calc(100vh - 100px)",
      }}
    >
      {data?.data.users.length === 0 && (
        <span>No hay usuarios pendientes por ahora.</span>
      )}
      {data?.data.users.map((user, index) => {
        return (
          <Card
            title={`Nuevo usuario ${user.fullname} ${user.email}`}
            key={index}
            footer={
              <>
                <Tag severity={"info"} value={formatDate(user.createdAt)} />
              </>
            }
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                label="Aceptar"
                onClick={() => {
                  toggleAccessUserMutate({
                    access: true,
                    userId: user.id as number,
                  });
                }}
              />
              <Button
                severity="danger"
                label="Denegar acceso"
                onClick={() => {
                  deleteUserByIdMutate(user.id);
                }}
              />
            </div>
          </Card>
        );
      })}

      <Paginator
        first={currentPage}
        rows={rows}
        totalRecords={userData?.data.count}
        rowsPerPageOptions={[1, 5, 10, 20]}
        onPageChange={(value) => {
          setCurrentPage(value.first);
          setRows(value.rows);
          getAllUsersMutate({
            access: false,
            page: value.page + 1,
            limit: value.rows,
          });
        }}
      />
    </div>
  );
};

export default PendingUsers;
