import './main-section.css';
import { createElement, createInput } from '../../../../utils/elements-creators';
import { searchAttributes, User, UserFromResponse } from '../../../interfaces';

export default class MainSection {
  mainSection: HTMLElement | HTMLDivElement | HTMLLinkElement;

  usersListContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  chatContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  searchinput: HTMLInputElement;

  userlist: HTMLElement | HTMLDivElement | HTMLLinkElement;

  constructor() {
    this.mainSection = createElement('mainSection', 'section');
    this.usersListContainer = createElement('list-container', 'nav');
    this.chatContainer = createElement('chat-container', 'article');
    this.searchinput = createInput(searchAttributes);
    this.searchinput.className = 'search-input';
    this.userlist = createElement('user-list', 'ul');
    this.usersListContainer.append(this.searchinput);
    this.mainSection.append(this.usersListContainer, this.chatContainer);
  }

  fillUserList(arrayOfUsers: UserFromResponse[]) {
    const copyArrayOfUsers = arrayOfUsers.slice();
    copyArrayOfUsers.forEach((item: UserFromResponse) => {
      const userItem = createElement('user-item', 'li');
      const userName = createElement('user-name', 'i');
      const disk = createElement(item.isLogined ? 'user-marker user-active' : 'user-marker', 'div');
      userName.textContent = item.login;
      userItem.append(disk, userName);
      this.userlist.append(userItem);
    });
    this.usersListContainer.append(this.userlist);
  }

  clearUserList() {
    this.userlist.innerHTML = '';
  }

  render(param: User) {
    const concatenatedUsersList = param.activeUsers.concat(param.inactiveUsers);
    this.clearUserList();
    this.fillUserList(concatenatedUsersList);
  }

  getHTml() {
    return this.mainSection;
  }
}
