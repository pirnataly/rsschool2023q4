import { createElement } from '../../../../../utils/elements-creators';
import { MessageType, UserFromResponse } from '../../../../interfaces';

export default class UserItem {
  userItem: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  userName: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  numberOfUnread: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  disk: HTMLDivElement;

  constructor(user: UserFromResponse) {
    this.userItem = createElement('user-item', 'li');
    this.userName = createElement('user-name', 'i');
    this.numberOfUnread = createElement('unread-number', 'div');
    this.disk = document.createElement('div');
    this.renderUser(user);
  }

  renderUser(user: UserFromResponse) {
    this.userName.textContent = user.login;
    this.disk.className = user.isLogined ? 'user-marker user-active' : 'user-marker';
    this.getHtml().append(this.disk, this.userName, this.numberOfUnread);
  }

  showUnread(history: MessageType[]) {
    if (history.length !== 0) {
      const unreadMessages = history.filter((message) => !message.status.isReaded);
      const unreadMessagesFromCertainUser = unreadMessages.filter(
        (message) => message.from === this.userName.textContent,
      );
      if (unreadMessagesFromCertainUser.length !== 0) {
        this.numberOfUnread.textContent = String(unreadMessagesFromCertainUser.length);
      }
    }
  }

  getHtml() {
    return this.userItem;
  }
}
