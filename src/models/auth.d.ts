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
