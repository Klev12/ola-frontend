import { Card } from "primereact/card";
import {
  NotificationGetDto,
  NotificationType,
} from "../../../models/notification";

import { Button } from "primereact/button";
import { useMutation, useQuery } from "react-query";
import {
  deleteUserById,
  toggleAccessUser,
} from "../../../services/user-service";
import { deleteNotificationById } from "../../../services/notification-service";
import ROUTES from "../../../consts/routes";
import { Link } from "react-router-dom";

interface NotificationCardProps {
  notification: NotificationGetDto;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { refetch } = useQuery({
    queryKey: ["notifications"],
  });

  const { mutate: toggleAccessUserMutate } = useMutation(
    ({ access, userId }: { access: boolean; userId: number | string }) =>
      toggleAccessUser(access, userId as number),
    {
      onSuccess: () => {
        deleteNotificationByIdMutate(notification.id);
      },
    }
  );

  const { mutate: deleteNotificationByIdMutate } = useMutation(
    deleteNotificationById,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deleteUserByIdMutate } = useMutation(deleteUserById, {
    onSuccess: () => {
      deleteNotificationByIdMutate(notification.id);
    },
  });

  return (
    <Card>
      {notification.type !== NotificationType.newUser && (
        <Button
          icon="pi pi-times"
          rounded
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            deleteNotificationByIdMutate(notification.id);
          }}
        />
      )}

      <h2>{notification.title}</h2>
      <p>{notification.description}</p>
      {notification.type === NotificationType.newUser && (
        <>
          <Button
            label="Aceptar"
            onClick={() => {
              toggleAccessUserMutate({
                access: true,
                userId: notification.metadata?.userId as number,
              });
            }}
          />
          <Button
            label="Denegar acceso"
            onClick={() => {
              deleteUserByIdMutate(notification.metadata?.userId as number);
            }}
          />
        </>
      )}
      {notification.type === NotificationType.verifyUser && (
        <>
          <Link
            target="_blank"
            to={ROUTES.DASHBOARD.CHECK_USER_FORM_ID(
              notification.metadata?.userId as number
            )}
          >
            Revisar formulario
          </Link>
        </>
      )}
    </Card>
  );
};

export default NotificationCard;
