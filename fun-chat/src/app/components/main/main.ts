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

  // обращается к изменяющим элементы функциям
  render(param: User, id: string) {
    switch (id) {
      case 'ul':
        this.header.changeUserName(param.login);
        this.mainSection.userlist.activeUsersMessages = [];
        this.mainSection.userlist.inactiveUsersMessages = [];
        this.mainSection.disabledChatForm();
        break;

      case 'ua':
        this.mainSection.userlist.activeUsers = curUser.user.activeUsers;
        this.mainSection.userlist.getHistory('active');
        break;

      case 'ui':
        this.mainSection.userlist.inactiveUsers = curUser.user.inactiveUsers;
        this.mainSection.userlist.getHistory('inactive');
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
        this.mainSection.userlist.activeUsers = curUser.user.activeUsers;
        this.mainSection.userlist.inactiveUsers = curUser.user.inactiveUsers;
        this.mainSection.clearUserList();
        this.mainSection.addUserList(this.mainSection.userlist.getAllUsers());
        // this.mainSection.render();
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
        this.mainSection.render();
        break;

      case 'ms':
        if (param.latestMessage) {
          const messageFrom = param.latestMessage.from;
          const messageTo = param.latestMessage.to;
          const userToChat = this.mainSection.userToChatWith.textContent;
          if (messageFrom === userToChat) {
            this.mainSection.appendMessage(param.latestMessage, 'to');
          }
          if (messageTo === userToChat) {
            this.mainSection.appendMessage(param.latestMessage, 'from');
          } else {
            const newarr = [];
            newarr.push(param.latestMessage);
            this.mainSection.userlist.activeUsersMessages.push(newarr);
            this.mainSection.clearUserList();
            this.mainSection.addUserList(this.mainSection.userlist.getAllUsers());
          }
        }
        break;

      case 'mfau':
        this.mainSection.userlist.activeUsersMessages.push(curUser.user.messages);
        break;

      case 'mfiu':
        this.mainSection.userlist.inactiveUsersMessages.push(curUser.user.messages);
        this.mainSection.render();
        break;

      case 'mfcu':
        this.mainSection.showMessageHistory(curUser.user.messages);
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
