import { LevelType } from "../../types";

let matrix = new Map<LevelType, object>([
  [LevelType.Beginner, { min: 0, max: 5 }],
  [LevelType.Intermediate, { min: 5.5, max: 7 }],
  [LevelType.Advanced, { min: 7.5, max: 10 }],
]);

const getLevel = (point: number) => {
  let result = LevelType.Beginner;

  matrix.forEach((i: any, key: LevelType) => {
    if (point >= i.min && point <= i.max) {
      result = key;
    }
  });

  return result;
};

export default getLevel;
