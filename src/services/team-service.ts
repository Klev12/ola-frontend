import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { TeamGetDto } from "../models/team";
import { UserGetDto } from "../models/user";

export function getAllTeams() {
  return axios.get<{ teams: TeamGetDto[] }>(`${ENV.BACKEND_ROUTE}/teams`);
}

export function getUsersFromTeam(teamId: number) {
  return axios.get<{ users: UserGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/teams/${teamId}/users`
  );
}
