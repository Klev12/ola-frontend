import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { NotificationGetDto } from "../models/notification";
import { Roles, UserGetDto } from "../models/user";

export function getAllUsers() {
  return axios.get<{ users: UserGetDto[] }>(`${ENV.BACKEND_ROUTE}/users`);
}

export function getAllNotifications() {
  return axios.get<{ notifications: NotificationGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/notifications`
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

export function deleteUserById(id: number | string) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/users/${id}`);
}

export function verifyUserForm(userId: number | string) {
  return axios.post(`${ENV.BACKEND_ROUTE}/users/verify-user-form`, {
    id: userId,
  });
}

export function findUserById(id: string | number) {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/users/${id}`);
}

export function getCountUsers() {
  return axios.get<{ count: number }>(`${ENV.BACKEND_ROUTE}/users/count`);
}
