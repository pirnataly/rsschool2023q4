import './main.css';
import curUser from '../../../utils/current-user';
import { ObserverInterface, User } from '../../interfaces';
import { createElement } from '../../../utils/elements-creators';
import Header from './header/header';
import Footer from './footer/footer';
import MainSection from './main-section/main-section';

class Main implements ObserverInterface {
  mainContainer: HTMLElement;

  footer: HTMLElement | HTMLDivElement;

  header: Header;

  footerContainer: Footer;

  mainSection: MainSection;

  constructor() {
    this.mainContainer = document.createElement('main');
    this.mainContainer.className = 'main';
    this.header = new Header();
    this.mainSection = new MainSection();
    this.footer = createElement('footer', 'footer');
    this.footerContainer = new Footer();
    this.footer.append(this.footerContainer.getHtml());
    this.mainContainer.append(this.header.getHtml(), this.mainSection.getHTml(), this.footer);
    curUser.subscribe(this);
  }

  update(param: User, id: string) {
    this.render(param, id);
  }

  render(param: User, id: string) {
    switch (id) {
      case 'ul':
        this.header.changeUserName(param.login);
        break;
      case 'ui':
      case 'uel':
      case 'ueo':
        this.mainSection.render(param);
        break;
      case 'ua':
      default:
        break;
    }
  }

  getHtml() {
    return this.mainContainer;
  }
}

const main = new Main();

export default main;
