import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { Roles, UserGetDto } from "../models/user";

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

export function changeRole(role: Roles, userId: number | string) {
  return axios.put(`${ENV.BACKEND_ROUTE}/users/change-role`, {
    role,
    user_id: userId,
  });
}
