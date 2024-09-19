import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import {
  TeamAssignUserDto,
  TeamGetDto,
  TeamPatchDto,
  TeamPostDto,
} from "../models/team";
import { UserGetDto } from "../models/user";

export function getAllTeams({
  userId,
  page = 1,
  limit = 10,
}: {
  userId?: number;
  page?: number;
  limit?: number;
}) {
  let endpoint = `${ENV.BACKEND_ROUTE}/teams?page=${page}&&limit=${limit}`;
  if (userId) {
    endpoint += `&&userId=${userId}`;
  }

  return axios.get<{ teams: TeamGetDto[]; count: number }>(endpoint);
}

export function getUsersFromTeam({
  teamId,
  page = 1,
  limit = 10,
}: {
  teamId: number;
  page?: number;
  limit?: number;
}) {
  return axios.get<{ teamUsers: { user: UserGetDto }[]; count: number }>(
    `${ENV.BACKEND_ROUTE}/teams/${teamId}/users?page=${page}&&limit=${limit}`
  );
}

export function createTeam(team: TeamPostDto) {
  return axios.post<{ team: TeamGetDto }>(`${ENV.BACKEND_ROUTE}/teams`, team);
}

export function updateTeam(team: TeamPatchDto) {
  return axios.patch(`${ENV.BACKEND_ROUTE}/teams`, team);
}

export function assignUserToTeam(team: TeamAssignUserDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/teams/assign-user`, team);
}

export function removeUserFromTeam(teamUserId: number) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/teams/remove-user/${teamUserId}`);
}

export function deleteTeamById({ id }: { id: number }) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/teams/${id}`);
}
