import './main.css';
import curUser from '../../../utils/current-user';
import { ObserverInterface, User } from '../../interfaces';
import {
  addHistory,
  createElement,
  // getHistoryForCertainUser,
  getHistoryFromAllUsers,
} from '../../../utils/elements-creators';
import Header from './header/header';
import Footer from './footer/footer';
import MainSection from './main-section/main-section';
import { concatActiveAndInactive } from '../../../utils/array-modifier';

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
        this.mainSection.disabledChatForm();
        break;

      case 'ua':
        getHistoryFromAllUsers(param, 'active');
        break;

      case 'ui':
        getHistoryFromAllUsers(param, 'inactive');
        break;

      case 'uel':
        // if (!param.newUser?.history) {
        //   Object.defineProperty(param.newUser, 'history', {
        //     value: [],
        //   });
        //   if (param.newUser) {
        //     getHistoryForCertainUser('mfau', param.newUser);
        //   }
        // }
        // addHistory(param, 'active');
        this.mainSection.render(param);
        break;

      case 'ueo':
        // this.mainSection.clearUserList();
        // this.mainSection.fillUserList(concatActiveAndInactive(param));
        // if(!param.newUser?.history) {
        //   Object.defineProperty(param.newUser, 'history', {
        //     value: []
        //   })
        //   if (param.newUser) {
        //     getHistoryForCertainUser('mfia', param.newUser)
        //   }
        // }
        // addHistory(param, 'inactive');
        this.mainSection.render(param);
        break;

      case 'ms':
        if (param.latestMessage) {
          const messageFrom = param.latestMessage.from;
          const messageTo = param.latestMessage.to;
          const userToChat = this.mainSection.userToChatWith.textContent;
          if (messageFrom === userToChat || messageTo === userToChat) {
            this.mainSection.appendMessage(param, param.latestMessage);
          } else {
            this.mainSection.clearUserList();
            this.mainSection.fillUserList(concatActiveAndInactive(param));
          }
        }
        break;

      case 'mfau':
        addHistory(param, 'active');
        this.mainSection.render(param);
        break;

      case 'mfia':
        addHistory(param, 'inactive');
        this.mainSection.render(param);
        break;
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
