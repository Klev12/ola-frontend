import { useQuery } from "react-query";
import { DataScroller } from "primereact/datascroller";
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
        <div>No hay notificaciones</div>
      )}
      <DataScroller
        value={notificationsData?.notifications}
        itemTemplate={(notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        )}
        rows={10} // Número de notificaciones cargadas inicialmente
        inline
        scrollHeight="700px"
        loader
        buffer={0.4} // Porcentaje de desplazamiento para cargar más notificaciones
        header="Notificaciones"
      />
    </div>
  );
};

export default Notifications;
