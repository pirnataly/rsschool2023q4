import './main-section.css';
import { createButton, createElement, createInput } from '../../../../utils/elements-creators';
import {
  formButtonAttributes,
  messageInputAttributes,
  MessageType,
  searchAttributes,
  sendButtonProperties,
  UserFromResponse,
} from '../../../interfaces';
import curUser from '../../../../utils/current-user';
import socket from '../../../../services/socket';
import Message from './message/message';
import UserList from './list/user-list';

export default class MainSection {
  mainSection: HTMLElement | HTMLDivElement | HTMLLinkElement;

  usersListContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  chatContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  searchinput: HTMLInputElement;

  userlist: UserList;

  chatHeader: HTMLElement | HTMLDivElement | HTMLLinkElement;

  userToChatWith: HTMLElement | HTMLDivElement | HTMLLinkElement;

  userToChatWithStatus: HTMLElement | HTMLDivElement | HTMLLinkElement;

  dialogContainer: HTMLElement | HTMLDivElement | HTMLLinkElement;

  chatForm: HTMLElement | HTMLDivElement | HTMLLinkElement;

  messageInput: HTMLInputElement;

  sendButton: HTMLButtonElement;

  mainDialogContainer: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  constructor() {
    this.mainSection = createElement('mainSection', 'section');
    this.usersListContainer = createElement('list-container', 'nav');
    this.chatContainer = createElement('chat-container', 'article');
    this.chatHeader = createElement('chat-header', 'article');
    this.userToChatWith = createElement('user-to-chat-width', 'label');
    this.userToChatWithStatus = createElement('user-status', 'label');
    this.chatHeader.append(this.userToChatWith, this.userToChatWithStatus);
    this.mainDialogContainer = createElement('main-dialog-container', 'article');
    this.dialogContainer = createElement('dialog-container', 'article');
    this.mainDialogContainer.append(this.dialogContainer);
    this.chatForm = createElement('chat-form', 'form');
    this.messageInput = createInput(messageInputAttributes);
    this.messageInput.classList.add('message-input');
    this.sendButton = createButton(formButtonAttributes, sendButtonProperties);
    this.chatForm.append(this.messageInput, this.sendButton);
    this.searchinput = createInput(searchAttributes);
    this.searchinput.className = 'search-input';
    this.userlist = new UserList();
    this.chatContainer.append(this.chatHeader, this.mainDialogContainer, this.chatForm);
    this.usersListContainer.append(this.searchinput);
    this.mainSection.append(this.usersListContainer, this.chatContainer);
    this.addEventListeners();
  }

  addUserList(users: UserFromResponse[]) {
    this.userlist.fillUserList(users);
    this.usersListContainer.append(this.userlist.getHtml());
  }

  clearUserList() {
    this.userlist.getHtml().innerHTML = '';
  }

  clearDialogContainer() {
    this.dialogContainer.innerHTML = '';
  }

  disabledChatForm() {
    Array.from(this.chatForm.children).forEach((child) =>
      child.setAttribute('disabled', 'disabled'),
    );
  }

  showMessageHistory(messages: MessageType[]) {
    if (messages.length) {
      messages.forEach((message) => {
        if (message.from === curUser.user.login) {
          this.appendMessage(message, 'from');
        } else {
          this.appendMessage(message, 'to');
        }
      });
    } else {
      const textLine = createElement('text-line', 'p');
      textLine.textContent = 'Write your first message...';
      this.dialogContainer.append(textLine);
    }
    // const currentUserToChat = param.find(
    //   (item) => item.login === this.userToChatWith.textContent,
    // );

    //   mesage
    //   if (currentUserToChat) {
    //     if (currentUserToChat.history.length !== 0) {
    //       currentUserToChat.history.forEach((historyMessage) => {
    //         this.appendMessage(user, historyMessage);
    //       });
    //     } else {
    //       const textLine = createElement('text-line', 'p');
    //       textLine.textContent = 'Write your first message...';
    //       this.dialogContainer.append(textLine);
    //     }
    //   }
    // }
  }

  appendMessage(message: MessageType, str: 'from' | 'to') {
    const messageView = new Message(message.id);
    messageView.renderMessage(message, str);
    if (this.dialogContainer.firstElementChild?.classList.contains('text-line')) {
      this.dialogContainer.innerHTML = '';
    }
    this.dialogContainer.append(messageView.getHtml());
  }

  updateStatus() {
    if (curUser.user.newUser?.login === this.userToChatWith.textContent) {
      this.userToChatWithStatus.textContent = curUser.user.newUser?.isLogined
        ? 'online'
        : 'offline';
    }
  }

  render() {
    this.clearUserList();
    this.addUserList(this.userlist.getAllUsers());
    this.updateStatus();
    this.clearDialogContainer();
  }

  addEventListeners() {
    this.searchinput.addEventListener('input', () => {
      const currentValue = this.searchinput.value;
      const arrayToFilter = this.userlist.getAllUsers();
      const filteredUsers = arrayToFilter.filter((item) =>
        item.login.toLowerCase().startsWith(currentValue.toLowerCase()),
      );
      this.userlist.getHtml().innerHTML = '';
      this.addUserList(filteredUsers);
    });

    this.userlist.getHtml().addEventListener('click', (ev) => {
      this.dialogContainer.innerHTML = '';
      const { target } = ev;
      const li = (target as HTMLElement).closest('li');
      if (li) {
        this.userToChatWith.textContent = li.children[1].textContent;
        socket.send(
          JSON.stringify({
            id: 'mfcu',
            type: 'MSG_FROM_USER',
            payload: {
              user: {
                login: this.userToChatWith.textContent,
              },
            },
          }),
        );
        this.userToChatWithStatus.textContent = li.children[0].classList.contains('user-active')
          ? 'online'
          : 'offline';
        Array.from(this.chatForm.children).forEach((child) => child.removeAttribute('disabled'));
        this.dialogContainer.innerHTML = '';

        // усли убрать, то сообщения не отображаются
        // const concatArrays = this.userlist.getAllUsers();
        // this.showMessageHistory(curUser.user, concatArrays);
      }
    });

    this.chatForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (this.messageInput.value !== '') {
        socket.send(
          JSON.stringify({
            id: 'ms',
            type: 'MSG_SEND',
            payload: {
              message: {
                to: this.userToChatWith.textContent,
                text: this.messageInput.value,
              },
            },
          }),
        );
        this.messageInput.value = '';
      }
    });
  }

  getHTml() {
    return this.mainSection;
  }
}
