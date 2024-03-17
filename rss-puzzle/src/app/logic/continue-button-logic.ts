import { Rounds } from '../../interfaces/types';

export function getNewRoundOfCurrentLevel(levelid: string): string {
  const levelId = levelid;
  const levelIdArray = levelId.split('_');
  const [level, round] = levelIdArray;
  const nextRoundOfCurrentLevel =
    String(+round + 1).length === 2 ? String(+round + 1) : `0String(+round + 1)`;
  const newLevelId = `${level}_${nextRoundOfCurrentLevel}`;
  return newLevelId;
}

export function getLevelIncreasedByOne(levelid: string): string {
  const levelId = levelid;
  const levelIdArray = levelId.split('_');
  const [level, ,] = levelIdArray;
  const nextlevelOfCurrentLevel = String(+level + 1);
  const newLevelId = `${nextlevelOfCurrentLevel}_01`;
  return newLevelId;
}

export function getNextLevelId(arrayOfGames: Rounds, currentlevelId: string) {
  const currentId = getNewRoundOfCurrentLevel(currentlevelId);
  const newGame = arrayOfGames.find((el) => el.levelData.id === currentId);
  if (newGame) {
    return currentId;
  }
  const increasedLevelId = getLevelIncreasedByOne(currentlevelId);
  if (arrayOfGames.find((el) => el.levelData.id === increasedLevelId)) {
    return increasedLevelId;
  }
  return '1_01';
}
