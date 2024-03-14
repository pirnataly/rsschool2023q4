import './start-page.css';
import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';
import Description from './description';
import StartButton from './start-button';
import Container from '../container';
import GamePage from '../02-game-page/game-page';
import { deleteBodyBackground } from '../../../../logic/logout-button-logic';
import { createGreeting } from './creating-elements-functions';

export default class StartPage extends View {
  constructor(nodeElem: Container) {
    const startPageParameters = {
      tag: 'div',
      classNames: [CssClasses.startPage],
    };
    super(startPageParameters);
    this.createStartPage(nodeElem);
  }

  createStartPage(nodeElem: Container) {
    const gamePage = new GamePage();
    const startPageButton = new StartButton().getHtmlelement();
    startPageButton.onclick = () => {
      deleteBodyBackground();
      nodeElem.setContent(gamePage.getHtmlelement());
    };
    this.getHtmlelement().append(
      new Description().getHtmlelement(),
      createGreeting(),
      startPageButton,
    );
  }
}
