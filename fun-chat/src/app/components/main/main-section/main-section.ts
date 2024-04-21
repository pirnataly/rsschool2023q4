import './main-section.css';
import { createElement, createInput } from '../../../../utils/elements-creators';
import { searchAttributes, User, UserFromResponse } from '../../../interfaces';
import curUser from '../../../../utils/current-user';
import { eraseMyselfFromActive } from '../../../../utils/array-modifier';

export default class MainSection {
  mainSection: HTMLElement | HTMLDivElement | HTMLLinkElement;

  usersListContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  chatContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  searchinput: HTMLInputElement;

  userlist: HTMLElement | HTMLDivElement | HTMLLinkElement;

  chatHeader: HTMLElement | HTMLDivElement | HTMLLinkElement;

  userToChatWith: HTMLElement | HTMLDivElement | HTMLLinkElement;

  userToChatWithStatus: HTMLElement | HTMLDivElement | HTMLLinkElement;

  constructor() {
    this.mainSection = createElement('mainSection', 'section');
    this.usersListContainer = createElement('list-container', 'nav');
    this.chatContainer = createElement('chat-container', 'article');
    this.chatHeader = createElement('chat-header', 'article');
    this.userToChatWith = createElement('user-to-chat-width', 'label');
    this.userToChatWithStatus = createElement('user-status', 'label');
    this.chatHeader.append(this.userToChatWith, this.userToChatWithStatus);
    this.chatContainer.append(this.chatHeader);
    this.searchinput = createInput(searchAttributes);
    this.searchinput.className = 'search-input';
    this.userlist = createElement('user-list', 'ul');
    this.usersListContainer.append(this.searchinput);
    this.mainSection.append(this.usersListContainer, this.chatContainer);
    this.addEventListeners();
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

  addEventListeners() {
    this.searchinput.addEventListener('input', () => {
      const currentValue = this.searchinput.value;
      const arrayToFilter = eraseMyselfFromActive(curUser.user).concat(curUser.user.inactiveUsers);
      const filteredUsers = arrayToFilter.filter((item) =>
        item.login.toLowerCase().startsWith(currentValue.toLowerCase()),
      );
      this.userlist.innerHTML = '';
      this.fillUserList(filteredUsers);
    });

    this.userlist.addEventListener('click', (ev) => {
      const { target } = ev;
      const li = (target as HTMLElement).closest('li');
      if (li) {
        this.userToChatWith.textContent = li.children[1].textContent;
        this.userToChatWithStatus.textContent = li.children[0].classList.contains('user-active')
          ? 'online'
          : 'offline';
      }
    });
  }

  getHTml() {
    return this.mainSection;
  }
}
