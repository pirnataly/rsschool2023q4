import { createButton, createElement } from '../../../../utils/elements-creators';
import './header.css';
import {
  headerAboutButtonProperties,
  logoutButtonProperties,
  typicalButtonAttributes,
} from '../../../interfaces';
import socket from '../../../../services/socket';
import curUser from '../../../../utils/current-user';
import AboutButton from '../../aboutButton';

export default class Header {
  textContainer: HTMLElement | HTMLDivElement;

  buttonContainer: HTMLElement | HTMLDivElement;

  userName: HTMLElement | HTMLDivElement;

  header: HTMLElement | HTMLDivElement;

  logoutButton: HTMLButtonElement;

  headerAboutButton: HTMLButtonElement;

  constructor() {
    this.header = createElement('header', 'header');
    this.textContainer = createElement('header-text', 'div');
    this.userName = createElement('header__user-name', 'p');
    const chatName = createElement('header__chat-name', 'p');
    chatName.textContent = 'Fun-chat';
    this.textContainer.append(this.userName, chatName);
    this.buttonContainer = createElement('header-buttons', 'div');
    this.headerAboutButton = new AboutButton(
      typicalButtonAttributes,
      headerAboutButtonProperties,
    ).getHtml();
    this.logoutButton = createButton(typicalButtonAttributes, logoutButtonProperties);
    this.addEventListeners();
    this.buttonContainer.append(this.headerAboutButton, this.logoutButton);
    this.header.append(this.textContainer, this.buttonContainer);
  }

  addEventListeners() {
    this.logoutButton.addEventListener('click', () => {
      socket.send(
        JSON.stringify({
          id: 'lo',
          type: 'USER_LOGOUT',
          payload: {
            user: {
              login: curUser.user.login,
              password: curUser.user.password,
            },
          },
        }),
      );
    });
  }

  getHtml() {
    return this.header;
  }

  changeUserName(login: string) {
    this.userName.textContent = `User: ${login}`;
  }
}
