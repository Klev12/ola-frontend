import { useQuery } from "react-query";
import { getAllUsers } from "../../services/user-service";

import UserCard from "../home/components/UserCard";

const Users = () => {
  const { data } = useQuery({ queryFn: getAllUsers, queryKey: ["users"] });

  return (
    <div>
      {data?.data.users.map((user) => {
        console.log(user);
        return (
          <div key={user.id}>
            <UserCard user={user} notificationMode={false} />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
