import './start-page.css';
import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';
import Container from '../container';
import Description from './description';

export default class StartPage extends View {
  constructor(nodeElem: Container) {
    const startPageParameters = {
      tag: 'div',
      classNames: [CssClasses.startPage],
    };
    super(startPageParameters);
    this.createStartPage(nodeElem);
  }

  createStartPage() {
    this.getHtmlelement().append(new Description().getHtmlelement());
  }
}
