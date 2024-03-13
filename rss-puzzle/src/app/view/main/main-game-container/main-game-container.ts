import './main-game-container.css';
import View from '../../view';
import { CssClasses } from '../../../../interfaces/types';
import Container from './container';
import StartPage from './01-start-page/start-page';

export default class MainGameContainer extends View {
  constructor() {
    const MainGameContainerParameters = {
      tag: 'div',
      classNames: [CssClasses.mainGameContainer],
    };
    super(MainGameContainerParameters);
    this.createManeGameContainer();
  }

  createManeGameContainer(): void {
    const container = new Container();
    const startpage = new StartPage();
    container.getHtmlelement().append(startpage.getHtmlelement());
    this.getHtmlelement()?.append(container.getHtmlelement());
  }
}
