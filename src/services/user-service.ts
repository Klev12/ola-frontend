import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { NotificationGetDto } from "../models/notification";
import {
  MetadataUser,
  Roles,
  UserArea,
  UserGetDto,
  UserMultimedia,
} from "../models/user";

export function getAllUsers({
  access = true,
  page = 1,
  limit = 10,
  area,
  keyword,
}: {
  access: boolean;
  page?: number;
  limit?: number;
  area?: UserArea;
  keyword?: string;
}) {
  let api = `${ENV.BACKEND_ROUTE}/users?access=${access}&&page=${page}&&limit=${limit}`;
  if (area) {
    api += `&&area=${area}`;
  }

  if (keyword) {
    api += `&&keyword=${keyword}`;
  }

  return axios.get<{ count: number; users: UserGetDto[] }>(api);
}

export function getAllNotifications({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  return axios.get<{ notifications: NotificationGetDto[]; count: number }>(
    `${ENV.BACKEND_ROUTE}/notifications?page=${page}&&limit=${limit}`
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
    userId: userId,
  });
}

export function deleteUserById(id: number | string) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/users/${id}`);
}

export function verifyUserForm(userId: number | string) {
  return axios.post(`${ENV.BACKEND_ROUTE}/users/verify-user-form`, {
    userId,
  });
}

export function findUserById(id: string | number) {
  return axios.get<{ user: UserGetDto; metadata: MetadataUser }>(
    `${ENV.BACKEND_ROUTE}/users/${id}`
  );
}

export function getCountUsers() {
  return axios.get<{ count: number }>(`${ENV.BACKEND_ROUTE}/users/count`);
}

export function patchUser({
  user,
}: {
  user: { fullname?: string; area?: UserArea; userId: number; email?: string };
}) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/users`, user);
}

export class UserService {
  readonly api = {
    base: `${ENV.BACKEND_ROUTE}/users`,
  };

  getMultimedia({ userId }: { userId: number }) {
    return axios.get<{ count: number; multimedia: UserMultimedia[] }>(
      `${this.api.base}/${userId}/multimedia`
    );
  }
}

const userService = new UserService();

export default userService;
