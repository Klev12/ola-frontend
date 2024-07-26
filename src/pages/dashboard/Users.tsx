import { useMutation, useQuery } from "react-query";
import { getAllUsers, getCountUsers } from "../../services/user-service";

import UserCard from "./components/UserCard";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Users = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const {
    mutate: getAllUsersMutate,
    data: userData,
    isLoading: isLoadingUsers,
  } = useMutation(getAllUsers);

  useEffect(() => {
    getAllUsersMutate({ access: true });
  }, []);

  const { data: userCountData } = useQuery({
    queryFn: getCountUsers,
    queryKey: "count-users",
  });

  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <Paginator
        first={currentPage}
        rows={rows}
        totalRecords={userData?.data.count}
        rowsPerPageOptions={[1, 5, 10, 20]}
        onPageChange={(value) => {
          setCurrentPage(value.first);
          setRows(value.rows);
          getAllUsersMutate({
            access: true,
            page: value.page + 1,
            limit: value.rows,
          });
        }}
      />
      {isLoadingUsers && <ProgressSpinner />}
      {userData?.data.users.map((user, index) => {
        return (
          <div key={index}>
            {authenticatedUser?.role === Roles.groupAdmin && (
              <>
                <h3>
                  El número de usuarios dentro del area
                  {authenticatedUser.area} es {userCountData?.data.count}
                </h3>
              </>
            )}
            <UserCard user={user} notificationMode={false} />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
