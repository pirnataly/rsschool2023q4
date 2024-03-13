import './start-page.css';
import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';
import Description from './description';

export default class StartPage extends View {
  constructor() {
    const startPageParameters = {
      tag: 'div',
      classNames: [CssClasses.startPage],
    };
    super(startPageParameters);
    this.createStartPage();
  }

  createStartPage() {
    this.getHtmlelement().append(new Description().getHtmlelement());
  }
}
