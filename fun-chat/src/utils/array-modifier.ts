import { User, UserFromResponse } from '../app/interfaces';

export function eraseMyselfFromActive(param: User) {
  const array = param.activeUsers.slice();
  const index = array.findIndex((item) => item.login === param.login);
  array.splice(index, 1);
  return array;
}

export function eraseItemFromArray(
  array: UserFromResponse[],
  item: UserFromResponse[],
): UserFromResponse[] {
  const [itemToErase] = item;
  const index = array.findIndex((arrayItem) => arrayItem === itemToErase);
  array.splice(index, 1);
  return array;
}

export function getCopyOfUser(
  users: UserFromResponse[],
  userToEnter: UserFromResponse,
): UserFromResponse[] | undefined {
  const index = users.findIndex((item) => item.login === userToEnter.login);
  let result;
  if (index) {
    result = users.slice(index, index + 1);
  }
  return result;
}

export function concatActiveAndInactive(param: User) {
  return param.activeUsers.concat(param.inactiveUsers);
}

export function getModifiedArray(param: User, str: 'active' | 'inactive'): UserFromResponse[] {
  const array = str === 'active' ? param.activeUsers.slice() : param.inactiveUsers.slice();
  return array;
}

export function isContainElem(
  param: User,
  str: 'active' | 'inactive',
  elem: UserFromResponse,
): boolean {
  const array = getModifiedArray(param, str);
  const res = !!array.find((item) => item.login === elem.login);
  return res;
}

export function addPropertyHistory(obj: UserFromResponse): void {
  Object.defineProperty(obj, 'history', {
    value: [],
    enumerable: true,
    configurable: true,
    writable: true,
  });
}
