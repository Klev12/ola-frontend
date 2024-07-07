import { UserGetDto } from "./user";

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  fullname: string;
  password: string;
  area: string;
}

export interface SignupCollaboratorDto extends SignupDto {
  code: string;
}

export interface ErrorResponse {
  message: string;
  statusaCode: number;
  errorCode: string;
}

export interface CustomError extends error {
  response?: {
    data?: ErrorResponse;
    status?: number;
  };
}

export interface LoginResponse {
  token: string;
  user: UserGetDto;
}
