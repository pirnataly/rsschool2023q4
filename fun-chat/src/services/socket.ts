import curUser from '../utils/current-user';
import { eraseItemFromArray, eraseMyselfFromActive } from '../utils/array-modifier';

const socket = new WebSocket('ws://localhost:4000');
socket.onmessage = function abcd(event) {
  const message = JSON.parse(event.data);
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
      curUser.user.activeUsers.push(message.payload.user);
      curUser.user.newUser = message.payload.user;
      curUser.user.inactiveUsers = eraseItemFromArray(curUser.user, 'inactive');
      curUser.notify('uel');
      break;
    case 'USER_EXTERNAL_LOGOUT':
      curUser.user.inactiveUsers.push(message.payload.user);
      curUser.user.newUser = message.payload.user;
      curUser.user.activeUsers = eraseItemFromArray(curUser.user, 'active');
      curUser.notify('ueo');
      break;

    default:
      return 'default';
  }
  return true;
};

export default socket;
