import Form from './form/form';
import View from '../view';
import { CssClasses } from '../../../interfaces/types';
import { isLocalStorageGetItem } from '../../services/local-storage';
import MainGameContainer from './main-game-container/main-game-container';
import changeBodyBackground, { changeLogoutButtonState } from '../../logic/logout-button-logic';

export default class Main extends View {
  private login: () => void;

  private logoutButton: HTMLButtonElement;

  constructor(loginFunction: () => void, logoutButton: HTMLButtonElement) {
    const mainParameters = {
      tag: 'main',
      classNames: [CssClasses.main],
    };
    super(mainParameters);
    this.login = loginFunction;
    this.logoutButton = logoutButton;
    this.createMainBlock();
  }

  createMainBlock() {
    const startPage = new MainGameContainer(this.login).getHtmlelement();
    const form = new Form(this.login).getHtmlelement();
    const childElement = isLocalStorageGetItem() ? startPage : form;

    changeBodyBackground(childElement, form, startPage);
    changeLogoutButtonState(this.logoutButton, this.login);
    const mainContainer = this.getHtmlelement();
    mainContainer.append(childElement);
  }
}
