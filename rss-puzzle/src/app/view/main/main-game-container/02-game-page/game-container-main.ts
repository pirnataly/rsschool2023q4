import View from '../../../view';
import ResultBlock from './result-block';
import { CssClasses } from '../../../../../interfaces/types';
import SourceBlock from './source-block';
import { clickAppending } from './extra-functions';

// взаимодейтсвие двух блоков result и source
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
    // вместо 0 передать номер текущего предложения
    const array = Array.from(this.sourceBlock.children);
    const array2 = Array.from(this.resultBlock.children[0].children); // rows
    clickAppending(array, array2);
  }
}
