import './game-page.css';
import { CountOfRow, CssClasses } from '../../../../../interfaces/types';
import View from '../../../view';
import { data } from './source-block';
import { getChosenGameObj, getCurrentSentence, makeWordsContainer } from './extra-functions';

export default class ResultBlock extends View {
  public rows: HTMLCollection;

  constructor() {
    const ResultBlockParameters = {
      tag: 'div',
      classNames: [CssClasses.resultBlock],
    };
    super(ResultBlockParameters);
    this.createResultBlock();
    this.rows = this.getHtmlelement().children;
    this.divideRowsPerWordsContainers();
  }

  createResultBlock(): void {
    const n: CountOfRow = 10;
    for (let i = 0; i < n; i += 1) {
      const resultBlockRow = document.createElement('div');
      resultBlockRow.classList.add('result-block-row');
      this.getHtmlelement().append(resultBlockRow);
    }
  }

  divideRowsPerWordsContainers() {
    const currentGame = getChosenGameObj(data, '2_03'); // объект игры
    for (let i = 0; i < this.rows.length; i += 1) {
      const currentSentence = getCurrentSentence(currentGame, i);
      const row = this.rows[i];
      makeWordsContainer(row, currentSentence.length);
    }
  }
}
