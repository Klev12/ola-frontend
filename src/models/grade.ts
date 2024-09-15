export interface GradeGetDto {
  id: number;
  score: number;
  testId: number;
  userId: number;
  expireTime: string;
  status: GradeStatus;
  userName: string;
  userCode: string;
}

export enum GradeStatus {
  unresolved = "unresolved",
  resolved = "resolved",
}
export interface GradeResponseGetDto {
  id: number;
  value: GradeResponseOption;
}

export enum GradeResponseOption {
  optionOne = "option-1",
  optionTwo = "option-2",
  optionThree = "option-3",
}
