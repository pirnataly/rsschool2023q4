import './app.css';
import '../style.css';
import curUser from '../utils/current-user';
import { form } from './components/form/form';
import main from './components/main/main';
import {
  ExitButtonProperties,
  ObserverInterface,
  typicalButtonAttributes,
  User,
} from './interfaces';
import { createButton, createElement } from '../utils/elements-creators';
import appStore from '../utils/app-store';
import aboutPage from './components/about/about';

export default class App implements ObserverInterface {
  container: HTMLDivElement;

  overlay: HTMLDivElement | HTMLElement;

  dialog: HTMLElement | HTMLDivElement;

  mistakeText: HTMLParagraphElement;

  dialogButton: HTMLButtonElement;

  constructor() {
    this.overlay = createElement('overlay', 'div');
    this.dialog = createElement('dialog', 'div');
    this.dialogButton = createButton(typicalButtonAttributes, ExitButtonProperties);
    this.dialogButton.onclick = () => {
      this.hideErrorFromServer();
      this.unlockBody();
    };
    this.mistakeText = document.createElement('p');
    this.dialog.append(this.mistakeText, this.dialogButton);
    document.body.append(this.overlay, this.dialog);
    this.container = document.createElement('div');
    this.addClass('app');
    this.render(curUser.user);
    curUser.subscribe(this);
    appStore.subscribe(() => {
      this.clear();
      this.container.append(aboutPage.getHtml());
    });

    document.body.append(this.container);
  }

  update(param: User): void {
    if (param.error === '') {
      this.clear();
      this.render(param);
    } else {
      this.blockBody();
      this.showErrorFromServer(param.error);
    }
  }

  blockBody() {
    this.overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  showErrorFromServer(text: string) {
    this.dialog.style.display = 'flex';
    this.mistakeText.textContent = text.toUpperCase();
  }

  hideErrorFromServer() {
    this.dialog.style.display = 'none';
  }

  unlockBody() {
    this.overlay.style.display = 'none';
    document.body.style.overflow = 'visible';
  }

  render(userObj: User) {
    const page = userObj.login === '' ? form.getHtml() : main.getHtml();
    this.container.append(page);
  }

  clear() {
    this.container.innerHTML = '';
  }

  addClass(nameOfClass: string) {
    this.container.classList.add(nameOfClass);
  }

  getHtml() {
    return this.container;
  }
}
