import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { UserGetDto } from "../models/user";

export function getAllUsers() {
  return axios.get<{ users: UserGetDto[] }>(`${ENV.BACKEND_ROUTE}/users`);
}

export function getAllNotifications() {
  return axios.get<{ users: UserGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/users/notifications`
  );
}

export function toggleAccessUser(access: boolean, userId: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/users/toggle-access`, {
    access,
    userId,
  });
}
