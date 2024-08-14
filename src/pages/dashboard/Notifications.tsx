import { useQuery } from "react-query";
import { DataScroller } from "primereact/datascroller";
import { getAllNotifications } from "../../services/user-service";
import NotificationCard from "./components/NotificationCard";
import useGlobalState from "../../store/store";
import { useState } from "react";
import PaginatorPage from "../../components/PaginatorPage";

const Notifications = () => {
  const setNumberOfNotification = useGlobalState(
    (state) => state.setNumberOfNotifications
  );

  const [currentPage, setCurrentPage] = useState(0);

  const { data: notificationsData } = useQuery({
    queryFn: () =>
      getAllNotifications({ page: currentPage + 1, limit: 10 }).then(
        (res) => res.data
      ),
    queryKey: ["notifications", currentPage],
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
        value={notificationsData?.notifications.sort(
          (a, b) => (b.id as number) - (a.id as number)
        )}
        itemTemplate={(notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        )}
        rows={10}
        inline
        scrollHeight="700px"
        loader
        buffer={0.4}
        header="Notificaciones"
        emptyMessage="No hay notificaciones"
      />
      <PaginatorPage
        limit={10}
        total={notificationsData?.count}
        onPage={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Notifications;
