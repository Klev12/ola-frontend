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
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Tag } from "primereact/tag";
import formatDate from "../../../utils/format-date";

interface NotificationCardProps {
  notification: NotificationGetDto;
}
const NotificationCard = ({ notification }: NotificationCardProps) => {
  const toast = useRef<Toast>(null);
  const { refetch } = useQuery({
    queryKey: ["notifications"],
  });

  const { mutate: toggleAccessUserMutate } = useMutation(
    ({ access, userId }: { access: boolean; userId: number | string }) =>
      toggleAccessUser(access, userId as number),
    {
      onSuccess: () => {
        deleteNotificationByIdMutate(notification.id);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Usuario aceptado",
          life: 4000,
        });
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
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El usuario ha sido denegado.",
        life: 4000,
      });
    },
  });

  return (
    <Card footer={<Tag value={formatDate(notification.createdAt)} />}>
      <Toast ref={toast} />
      {notification.type !== NotificationType.newUser && (
        <Button
          icon="pi pi-times"
          rounded
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            console.log(notification);
            deleteNotificationByIdMutate(notification.id);
          }}
        />
      )}

      <h2>
        {notification.title}{" "}
        {!notification.seen && <Tag value="nuevo" severity="info" />}
      </h2>
      <p>{notification.description}</p>
      {notification.type === NotificationType.newUser && (
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <Button
            style={{ backgroundColor: "purple", border: 0, boxShadow: "none" }}
            label="Aceptar"
            onClick={() => {
              toggleAccessUserMutate({
                access: true,
                userId: notification.metadata?.userId as number,
              });
            }}
          />
          <Button
            style={{
              backgroundColor: "purple",
              border: 0,
              boxShadow: "none",
              gap: 5,
            }}
            label="Denegar acceso"
            onClick={() => {
              deleteUserByIdMutate(notification.metadata?.userId as number);
            }}
          />
        </div>
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
      {notification.type === NotificationType.newTransaction && (
        <>
          <Link
            target="_blank"
            to={ROUTES.DASHBOARD.CHECK_FORM_ID(
              notification.metadata.formId as number
            )}
          >
            Revisar formulario
          </Link>
        </>
      )}
      {notification.type === NotificationType.transactionCompleted && (
        <>
          <Link
            target="_blank"
            to={ROUTES.SALES.PDF_ID(notification.metadata.formId as string)}
          >
            Revisar pdf
          </Link>
        </>
      )}
    </Card>
  );
};

export default NotificationCard;
