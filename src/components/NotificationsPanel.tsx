import ROUTES from "../consts/routes";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { Badge } from "primereact/badge";
import { getUnseenCountNotifications } from "../services/notification-service";

const NotificationsPanel = () => {
  const navigate = useNavigate();

  const { data: notificationData } = useQuery({
    queryFn: () => getUnseenCountNotifications().then((res) => res.data),
    queryKey: ["notification-data"],
    refetchInterval: 3000,
  });

  return (
    <div
      style={{
        padding: "6px",
        display: "flex",
        alignItems: "center",
        marginRight: "20px",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(ROUTES.NOTIFICATIONS.ME);
      }}
    >
      <i className="pi pi-bell p-overlay-badge" style={{ fontSize: "1.4rem" }}>
        {notificationData?.count !== 0 && (
          <Badge value={notificationData?.count}></Badge>
        )}
      </i>
    </div>
  );
};

export default NotificationsPanel;
