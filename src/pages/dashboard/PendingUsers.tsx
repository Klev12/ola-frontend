import { useQuery } from "react-query";
import useGlobalState from "../../store/store";
import { getAllUsers, getCountUsers } from "../../services/user-service";
import { Roles } from "../../models/user";
import UserCard from "./components/UserCard";

const PendingUsers = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const { data, refetch } = useQuery({
    queryFn: () => getAllUsers(false),
    queryKey: ["peding-users"],
    refetchOnMount: true,
    refetchInterval: 20000,
  });

  const { data: userCountData } = useQuery({
    queryFn: getCountUsers,
    queryKey: "count-users",
  });

  return (
    <div>
      <button onClick={() => refetch()}>recargar</button>
      {data?.data.users.map((user, index) => {
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

export default PendingUsers;
