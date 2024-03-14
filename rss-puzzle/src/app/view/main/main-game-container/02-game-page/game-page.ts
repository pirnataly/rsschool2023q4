import './game-page.css';
import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';

export default class GamePage extends View {
  constructor() {
    const GamePageParameters = {
      tag: 'div',
      classNames: [CssClasses.gamePage],
    };
    super(GamePageParameters);
  }
}
