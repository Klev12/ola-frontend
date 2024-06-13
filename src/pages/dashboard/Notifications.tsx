import { useQuery } from "react-query";
import { getAllNotifications } from "../../services/user-service";
import NotificationCard from "./components/NotificationCard";
import useGlobalState from "../../store/store";

const Notifications = () => {
  const setNumberOfNotification = useGlobalState(
    (state) => state.setNumberOfNotifications
  );

  const { data: notificationsData } = useQuery({
    queryFn: () => getAllNotifications().then((res) => res.data),
    queryKey: ["notifications"],
    onSuccess: (data) => {
      const numberOfNotifications = data.notifications.length;
      setNumberOfNotification(numberOfNotifications);
    },
    refetchInterval: 20000,
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
