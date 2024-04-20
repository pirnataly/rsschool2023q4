import curUser from '../utils/current-user';

const socket = new WebSocket('ws://localhost:4000');
socket.onmessage = function abcd(event) {
  const message = JSON.parse(event.data);
  switch (message.type) {
    case 'USER_LOGIN':
      curUser.user.error = '';
      curUser.user.isLogined = message.payload.user.isLogined;
      curUser.notify();
      break;
    case 'ERROR':
      curUser.user.error = message.payload.error;
      curUser.notify();
      break;
    case 'USER_LOGOUT':
      curUser.user.isLogined = message.payload.user.isLogined;
      curUser.user.login = '';
      curUser.user.password = '';
      curUser.user.error = '';
      curUser.notify();
      break;
    default:
      return 'default';
  }
  return true;
};

export default socket;
