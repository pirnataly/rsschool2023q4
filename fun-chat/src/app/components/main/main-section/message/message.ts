import './message.css';
import { createElement } from '../../../../../utils/elements-creators';
import { MessageType } from '../../../../interfaces';
import { getRuDate } from '../../../../../utils/validate-functions';

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

  id: string;

  constructor(messageId: string) {
    this.id = messageId;
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

  // from от меня
  renderMessage(message: MessageType, str: 'from' | 'to') {
    if (str === 'from') {
      this.getHtml().classList.add('right');
      this.messageFrom.textContent = 'You';
      if (message.status.isReaded) {
        this.messageStatus2.textContent = 'Read';
      } else if (message.status.isDelivered) {
        this.messageStatus2.textContent = 'Delivered';
      } else this.messageStatus2.textContent = 'Sent';
    }
    if (str === 'to') {
      this.messageFrom.textContent = message.from;
    }
    this.messageTime.textContent = getRuDate(new Date(message.datetime));
    this.messageText.textContent = message.text;
  }

  getHtml() {
    return this.messageBlock;
  }
}
