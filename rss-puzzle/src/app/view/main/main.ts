import Form from './form/form';
import View from '../view';
import { CssClasses } from '../../../interfaces/types';

export default class Main extends View {
  private login: () => void;

  constructor(login: () => void) {
    const mainParameters = {
      tag: 'main',
      classNames: [CssClasses.main],
    };
    super(mainParameters);
    this.login = login;
    this.createMainBlock();
  }

  createMainBlock() {
    const formElement = new Form(this.login).getHtmlelement();
    const mainElement = this.getHtmlelement();
    mainElement.append(formElement);
  }
}
