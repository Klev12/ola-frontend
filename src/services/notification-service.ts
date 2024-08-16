import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";

export function deleteNotificationById(id: string | number) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/notifications/${id}`);
}

export function sendVerifyUserNotification(formId: string | number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/notifications/verify-user`, {
    formId,
  });
}

export function markAsSeenNotification({
  notificationsIds,
}: {
  notificationsIds: number[];
}) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/notifications/mark-as-seen`, {
    notificationsIds,
  });
}

export function getUnseenCountNotifications() {
  return axios.get<{ count: number }>(
    `${ENV.BACKEND_ROUTE}/notifications/unseen-count`
  );
}
