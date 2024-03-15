import View from '../../../view';
import ResultBlock from './result-block';
import { CssClasses } from '../../../../../interfaces/types';
import SourceBlock from './source-block';
import { clickAppend } from './extra-functions';
import './game-page.css';

// взаимодествие двух блоков result и source
export default class GameContainerMain extends View {
  resultBlock: Element;

  sourceBlock: Element;

  constructor() {
    const prop = {
      tag: 'div',
      classNames: [CssClasses.gameContainerMain],
    };
    super(prop);
    this.createGameView();
    [this.resultBlock, this.sourceBlock] = [
      this.getHtmlelement().children[0],
      this.getHtmlelement().children[1],
    ];
    this.addEventListeners();
  }

  createGameView(): void {
    const resultBlock = new ResultBlock();
    const sourceBlock = new SourceBlock();
    this.getHtmlelement().append(resultBlock.getHtmlelement(), sourceBlock.getHtmlelement());
  }

  addEventListeners(): void {
    // вместо 0 передать номер текущего предложения в array2
    const sourceArray = Array.from(this.sourceBlock.children);
    const resultArray = Array.from(this.resultBlock.children[0].children); // rows[0]
    const wordContainers = Array.from(this.sourceBlock.children);

    wordContainers.forEach((wordContainer) => {
      wordContainer.firstElementChild?.addEventListener('click', (e: Event) =>
        clickAppend(e, resultArray, sourceArray),
      );
    });
  }
}
