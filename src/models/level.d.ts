export interface LevelGetDto {
  id: number;
  position: LevelRank;
}

export enum LevelRank {
  none = "none",
  levelZero = "level_zero",
  levelOne = "level_one",
  levelTwo = "level_two",
}
