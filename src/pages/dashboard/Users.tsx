import { useQuery } from "react-query";
import { getAllUsers } from "../../services/user-service";

import UserCard from "../home/components/UserCard";

const Users = () => {
  const { data, refetch } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  return (
    <div>
      <button onClick={() => refetch()}>recargar</button>
      {data?.data.users.map((user, index) => {
        return (
          <div key={index}>
            <UserCard user={user} notificationMode={false} />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
