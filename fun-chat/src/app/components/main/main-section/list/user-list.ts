import { MessageType, UserFromResponse } from '../../../../interfaces';
import { getHistoryForCertainUser } from '../../../../../utils/elements-creators';
import UserItem from './user-item';
import { concatActiveAndInactive } from '../../../../../utils/array-modifier';

export default class UserList {
  userList: HTMLUListElement;

  allUsers: UserFromResponse[];

  activeUsers: UserFromResponse[];

  inactiveUsers: UserFromResponse[];

  activeUsersMessages: MessageType[][];

  inactiveUsersMessages: MessageType[][];

  allUsersMessages: MessageType[];

  constructor() {
    this.allUsers = [];
    this.allUsersMessages = [];
    this.activeUsers = [];
    this.activeUsersMessages = [];
    this.inactiveUsers = [];
    this.inactiveUsersMessages = [];
    this.userList = document.createElement('ul');
    this.userList.className = 'user-list';
  }

  getHistory(str: 'active' | 'inactive') {
    const arrayForGetHistory = str === 'active' ? this.activeUsers : this.inactiveUsers;
    const idValue = str === 'active' ? 'mfau' : 'mfiu';
    arrayForGetHistory.forEach((user) => getHistoryForCertainUser(idValue, user));
  }

  getAllUsers() {
    return concatActiveAndInactive(this.activeUsers, this.inactiveUsers);
  }

  fillUserList(users: UserFromResponse[]) {
    users.forEach((user: UserFromResponse) => {
      const userItem = new UserItem(user);
      userItem.showUnread([...this.activeUsersMessages, ...this.inactiveUsersMessages].flat(2));
      this.userList.append(userItem.getHtml());
    });
  }

  getHtml() {
    return this.userList;
  }
}
