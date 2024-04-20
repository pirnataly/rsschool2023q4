import './main.css';
import curUser from '../../../utils/current-user';
import { ObserverInterface, User } from '../../interfaces';
import { createElement } from '../../../utils/elements-creators';
import Header from './header/header';

class Main implements ObserverInterface {
  mainContainer: HTMLElement;

  mainSection: HTMLElement | HTMLDivElement;

  footer: HTMLElement | HTMLDivElement;

  header: Header;

  constructor() {
    this.mainContainer = document.createElement('main');
    this.mainContainer.className = 'main';
    this.header = new Header();
    this.mainSection = createElement('mainSection', 'section');
    this.footer = createElement('footer', 'footer');
    this.mainContainer.append(this.header.getHtml(), this.mainSection, this.footer);
    curUser.subscribe(this);
  }

  update(param: User) {
    this.render(param);
  }

  render(param: User) {
    this.header.changeUserName(param.login);
  }

  getHtml() {
    return this.mainContainer;
  }
}

const main = new Main();

export default main;
