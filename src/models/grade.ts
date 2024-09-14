export interface GradeGetDto {
  id: number;
  score: number;
  testId: number;
  userId: number;
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
