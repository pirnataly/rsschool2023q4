import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';
import GameContainerMain from './game-container-main';

export default class GamePage extends View {
  constructor() {
    const GamePageParameters = {
      tag: 'div',
      classNames: [CssClasses.gamePage],
    };
    super(GamePageParameters);
    this.createBlocks();
  }

  createBlocks() {
    const game = new GameContainerMain();
    this.getHtmlelement().append(game.getHtmlelement());
  }
}
