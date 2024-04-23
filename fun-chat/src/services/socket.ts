import curUser from '../utils/current-user';
import {
  eraseItemFromArray,
  eraseMyselfFromActive,
  getCopyOfUser,
  getModifiedArray,
  isContainElem,
} from '../utils/array-modifier';

const socket = new WebSocket('ws://localhost:4000');
socket.onmessage = function abcd(event) {
  const message = JSON.parse(event.data);
  const { id } = message;
  switch (message.type) {
    case 'USER_LOGIN':
      curUser.user.error = '';
      curUser.user.isLogined = message.payload.user.isLogined;
      curUser.notify('ul');
      break;
    case 'ERROR':
      curUser.user.error = message.payload.error;
      curUser.notify('er');
      break;
    case 'USER_LOGOUT':
      curUser.user.isLogined = message.payload.user.isLogined;
      curUser.user.login = '';
      curUser.user.password = '';
      curUser.user.error = '';
      curUser.user.isLogined = false;
      curUser.user.activeUsers = [];
      curUser.user.inactiveUsers = [];
      curUser.notify('uo');
      break;

    case 'USER_ACTIVE':
      curUser.user.activeUsers = message.payload.users;
      curUser.user.activeUsers = eraseMyselfFromActive(curUser.user);
      curUser.notify('ua');
      break;

    case 'USER_INACTIVE':
      curUser.user.inactiveUsers = message.payload.users;
      curUser.notify('ui');
      break;

    case 'USER_EXTERNAL_LOGIN':
      if (isContainElem(curUser.user, 'inactive', message.payload.user)) {
        const arrayToModify = getModifiedArray(curUser.user, 'inactive');
        const itemToErase = getCopyOfUser(arrayToModify, message.payload.user);
        if (itemToErase) {
          curUser.user.inactiveUsers = eraseItemFromArray(arrayToModify, itemToErase);
          curUser.user.activeUsers.push(message.payload.user);
        }
      } else {
        curUser.user.newUser = message.payload.user;
        curUser.user.activeUsers.push(message.payload.user);
      }
      curUser.notify('uel');
      break;

    case 'USER_EXTERNAL_LOGOUT':
      curUser.user.newUser = message.payload.user;
      if (isContainElem(curUser.user, 'active', message.payload.user)) {
        const arrayToModify = getModifiedArray(curUser.user, 'active');
        const itemToErase = getCopyOfUser(arrayToModify, message.payload.user);
        if (itemToErase) {
          curUser.user.activeUsers = eraseItemFromArray(arrayToModify, itemToErase);
          curUser.user.inactiveUsers.push(message.payload.user);
        }
      }
      curUser.notify('ueo');
      break;

    case 'MSG_SEND':
      curUser.user.latestMessage = message.payload.message;
      curUser.notify('ms');
      break;

    case 'MSG_FROM_USER':
      curUser.user.messages = message.payload.messages;
      curUser.notify(id);
      break;
    default:
      return 'default';
  }
  return true;
};

export default socket;
