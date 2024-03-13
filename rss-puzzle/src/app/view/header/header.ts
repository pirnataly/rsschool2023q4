import './header.css';
import View from '../view';
import { CssClasses } from '../../../interfaces/types';
import Button from '../button/button';

export default class Header extends View {
  constructor() {
    const headerParameters = {
      tag: 'header',
      classNames: [CssClasses.header],
    };
    super(headerParameters);
    this.createHeaderButton();
  }

  createHeaderButton(): void {
    const headerButton = new Button().getHtmlelement();
    headerButton.textContent = 'Logout';
    const headerElement = this.getHtmlelement();
    headerElement.append(headerButton);
  }
}
