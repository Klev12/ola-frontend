import { useQuery } from "react-query";
import { getAllNotifications } from "../../services/user-service";
import UserCard from "../home/components/UserCard";

const Notifications = () => {
  const { data } = useQuery({
    queryFn: getAllNotifications,
    queryKey: ["notifications"],
  });

  return (
    <div>
      {" "}
      {data?.data.users.map((user) => {
        console.log(user);
        return (
          <div key={user.id} style={{ backgroundColor: "" }}>
            <UserCard user={user} notificationMode={true} />
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
