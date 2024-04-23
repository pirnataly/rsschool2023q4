import curUser from '../utils/current-user';
import {
  addPropertyHistory,
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
      // curUser.user.activeUsers = [];
      // curUser.user.inactiveUsers = [];
      curUser.notify('uo');
      break;

    case 'USER_ACTIVE':
      curUser.user.activeUsers = message.payload.users;
      curUser.user.activeUsers = eraseMyselfFromActive(curUser.user);
      curUser.user.activeUsers.forEach((user) => {
        addPropertyHistory(user);
      });
      curUser.notify('ua');
      break;

    case 'USER_INACTIVE':
      curUser.user.inactiveUsers = message.payload.users;
      curUser.user.inactiveUsers.forEach((user) => {
        addPropertyHistory(user);
      });
      curUser.notify('ui');
      break;

    case 'USER_EXTERNAL_LOGIN':
      if (isContainElem(curUser.user, 'inactive', message.payload.user)) {
        const arrayToModify = getModifiedArray(curUser.user, 'inactive');
        const itemToErase = getCopyOfUser(arrayToModify, message.payload.user);
        if (itemToErase) {
          curUser.user.inactiveUsers = eraseItemFromArray(arrayToModify, itemToErase);
          const [itemToPaste] = itemToErase;
          itemToPaste.isLogined = true;
          curUser.user.activeUsers.push(itemToPaste);
        }
      } else {
        curUser.user.newUser = message.payload.user;
        if (curUser.user.newUser) {
          addPropertyHistory(curUser.user.newUser);
          curUser.user.activeUsers.push(curUser.user.newUser);
        }
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
          const [itemToPaste] = itemToErase;
          itemToPaste.isLogined = false;
          curUser.user.inactiveUsers.push(itemToPaste);
        }
      }
      curUser.notify('ueo');
      break;

    case 'MSG_SEND':
      curUser.user.latestMessage = message.payload.message;
      curUser.user.inactiveUsers.concat(curUser.user.activeUsers).forEach((user) => {
        if (
          user.login === message.payload.message.to ||
          user.login === message.payload.message.from
        ) {
          user.history.push(message.payload.message);
        }
      });
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
