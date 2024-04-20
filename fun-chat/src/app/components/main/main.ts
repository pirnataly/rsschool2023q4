import './main.css';
import curUser from '../../../utils/current-user';
import { ObserverInterface, User } from '../../interfaces';
import { createElement } from '../../../utils/elements-creators';
import Header from './header/header';
import Footer from './footer/footer';

class Main implements ObserverInterface {
  mainContainer: HTMLElement;

  mainSection: HTMLElement | HTMLDivElement;

  footer: HTMLElement | HTMLDivElement;

  header: Header;

  footerContainer: Footer;

  constructor() {
    this.mainContainer = document.createElement('main');
    this.mainContainer.className = 'main';
    this.header = new Header();
    this.mainSection = createElement('mainSection', 'section');
    this.footer = createElement('footer', 'footer');
    this.footerContainer = new Footer();
    this.footer.append(this.footerContainer.getHtml());
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
