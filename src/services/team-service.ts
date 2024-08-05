import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { TeamAssignUserDto, TeamGetDto, TeamPostDto } from "../models/team";
import { UserGetDto } from "../models/user";

export function getAllTeams({ userId }: { userId?: number }) {
  let endpoint = `${ENV.BACKEND_ROUTE}/teams`;
  if (userId) {
    endpoint += `?userId=${userId}`;
  }

  return axios.get<{ teams: TeamGetDto[] }>(endpoint);
}

export function getUsersFromTeam(teamId: number) {
  return axios.get<{ teamUsers: { user: UserGetDto }[] }>(
    `${ENV.BACKEND_ROUTE}/teams/${teamId}/users`
  );
}

export function createTeam(team: TeamPostDto) {
  return axios.post<{ team: TeamGetDto }>(`${ENV.BACKEND_ROUTE}/teams`, team);
}

export function assignUserToTeam(team: TeamAssignUserDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/teams/assign-user`, team);
}

export function removeUserFromTeam(teamUserId: number) {
  return axios.delete(`${ENV.BACKEND_ROUTE}/teams/remove-user/${teamUserId}`);
}
