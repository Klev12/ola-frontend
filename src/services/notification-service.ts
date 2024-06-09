import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";

export function deleteNotificationById(id: string | number) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/notifications/${id}`);
}
