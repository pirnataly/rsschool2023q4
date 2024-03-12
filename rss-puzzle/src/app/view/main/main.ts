import Form from './form/form';
import View from '../view';
import { CssClasses } from '../../../interfaces/types';

export default class Main extends View {
  constructor() {
    const mainParameters = {
      tag: 'main',
      classNames: [CssClasses.main],
    };
    super(mainParameters);
    this.createMainBlock();
  }

  createMainBlock() {
    const formElement = new Form().getHtmlelement();
    const mainElement = this.getHtmlelement();
    mainElement.append(formElement);
  }
}
