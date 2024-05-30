import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { LoginDto, SignupDto } from "../models/auth";
import { UserGetDto } from "../models/user";

export function login(user: LoginDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/login`, user);
}

export function signup(user: SignupDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/signup`, user);
}
export function authenticate() {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/me`);
}

export function verifyUser() {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/verify`);
}
