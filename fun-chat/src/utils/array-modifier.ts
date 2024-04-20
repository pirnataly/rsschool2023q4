import { User } from '../app/interfaces';

export function eraseMyselfFromActive(param: User) {
  const array = param.activeUsers.slice();
  const index = array.findIndex((item) => item.login === param.login);
  array.splice(index, 1);
  return array;
}

export function eraseItemFromArray(param: User, str: 'active' | 'inactive') {
  const array = str === 'active' ? param.activeUsers.slice() : param.inactiveUsers.slice();
  const index = array.findIndex((item) => item.login === param.newUser?.login);
  array.splice(index, 1);
  return array;
}
