import { useQuery } from "react-query";
import { getAllNotifications } from "../../services/user-service";
import { Card } from "primereact/card";
import NotificationCard from "./components/NotificationCard";

const Notifications = () => {
  const { data: notificationsData } = useQuery({
    queryFn: () => getAllNotifications().then((res) => res.data),
    queryKey: ["notifications"],
  });

  return (
    <div>
      {notificationsData?.notifications.length === 0 && (
        <div>No hay notificationes</div>
      )}
      {notificationsData?.notifications.map((notification) => {
        return (
          <NotificationCard key={notification.id} notification={notification} />
        );
      })}
    </div>
  );
};

export default Notifications;
