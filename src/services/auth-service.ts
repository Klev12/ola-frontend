import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { LoginDto, SignupCollaboratorDto, SignupDto } from "../models/auth";
import { UserGetDto } from "../models/user";

export function login(user: LoginDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/login`, user);
}

export function signup(user: SignupDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/signup`, user);
}

export function signupCollaborator(user: SignupCollaboratorDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/signup/collaborator`, user);
}

export function authenticate() {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/me`);
}

export function verifyUser() {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/verify`);
}

export function logout() {
  return axios.get(`${ENV.BACKEND_ROUTE}/logout`);
}

export function verifyByUserId(id: string | number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/verify`, { id });
}
