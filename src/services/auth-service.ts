import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { LoginDto, SignupCollaboratorDto, SignupDto } from "../models/auth";
import { UserGetDto } from "../models/user";

export function login(user: LoginDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/auth/login`, user);
}

export function signup(user: SignupDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/auth/signup`, user);
}

export function signupCollaborator(user: SignupCollaboratorDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/auth/signup/member`, user);
}

export function authenticate() {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/auth/me`);
}

export function verifyUser() {
  return axios.get<{ user: UserGetDto }>(`${ENV.BACKEND_ROUTE}/auth/verify`);
}

export function logout() {
  return axios.get(`${ENV.BACKEND_ROUTE}/auth/logout`);
}

export function verifyByUserId(id: string | number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/auth/verify`, { id });
}

export class AuthService {
  readonly api = {
    requestNewPassword: `${ENV.BACKEND_ROUTE}/auth/request-new-password`,
    changePassword: `${ENV.BACKEND_ROUTE}/auth/change-password`,
  };

  requestNewPassword({ email }: { email: string }) {
    return axios.post(`${this.api.requestNewPassword}`, { email });
  }

  changePassword({ password, token }: { token: string; password: string }) {
    return axios.post(`${this.api.changePassword}`, { token, password });
  }
}

const authService = new AuthService();

export default authService;
