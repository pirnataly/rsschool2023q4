import './message.css';
import { createElement } from '../../../../../utils/elements-creators';

export default class Message {
  messageBlock: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageContainer: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageHeader: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageFrom: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageTime: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageText: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageStatus1: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  changeStatus: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageStatuses: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  messageStatus2: HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement;

  constructor() {
    this.messageBlock = createElement('message-block', 'div');
    this.messageContainer = createElement('message-container', 'div');
    this.messageHeader = createElement('message-header', 'div');
    this.messageFrom = createElement('message-from', 'label');

    this.messageTime = createElement('message-time', 'label');

    this.messageText = createElement('message-text', 'p');

    this.changeStatus = createElement('change-status', 'label');

    this.messageStatuses = createElement('message-statuses', 'div');

    this.messageStatus1 = createElement('message-status1', 'label');
    this.messageStatus2 = createElement('message-status2', 'label');

    this.messageStatuses.append(this.messageStatus1, this.messageStatus2);
    this.messageHeader.append(this.messageFrom, this.messageTime);
    this.messageContainer.append(this.messageHeader, this.messageText, this.messageStatuses);
    this.messageBlock.append(this.messageContainer);
  }

  getHtml() {
    return this.messageBlock;
  }
}
