import { useMutation, useQuery } from "react-query";
import { DataScroller } from "primereact/datascroller";
import { getAllNotifications } from "../../services/user-service";
import NotificationCard from "./components/NotificationCard";
import useGlobalState from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import PaginatorPage from "../../components/PaginatorPage";
import { markAsSeenNotification } from "../../services/notification-service";

const Notifications = () => {
  const setNumberOfNotification = useGlobalState(
    (state) => state.setNumberOfNotifications
  );

  const [currentPage, setCurrentPage] = useState(0);

  const setEnabledFetchNotifications = useGlobalState(
    (state) => state.setEnabledFetchNotifications
  );

  const { data: notificationsData } = useQuery({
    queryFn: () =>
      getAllNotifications({ page: currentPage + 1, limit: 10 }).then(
        (res) => res.data
      ),
    queryKey: ["notifications", currentPage],
    onSuccess: (data) => {
      const numberOfNotifications = data.notifications.length;
      setNumberOfNotification(numberOfNotifications);
      setEnabledFetchNotifications(false);
    },
    refetchInterval: 3000,
  });

  const { mutate: markAsSeenNotificationMutate } = useMutation(
    markAsSeenNotification
  );

  const unseenNotifications = useMemo(() => {
    return notificationsData?.notifications?.filter(
      (notification) => !notification.seen
    );
  }, [notificationsData]);

  useEffect(() => {
    return () => {
      setEnabledFetchNotifications(true);
    };
  }, []);

  useEffect(() => {
    markAsSeenNotificationMutate({
      notificationsIds: unseenNotifications?.map(
        (unseenNotification) => unseenNotification.id as number
      ) as [],
    });
  }, [unseenNotifications]);

  return (
    <div>
      <DataScroller
        value={notificationsData?.notifications.sort(
          (a, b) => (b.id as number) - (a.id as number)
        )}
        itemTemplate={(notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        )}
        rows={10}
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
