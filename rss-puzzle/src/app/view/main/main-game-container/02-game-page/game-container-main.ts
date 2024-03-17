import View from '../../../view';
import ResultBlock from './result-block';
import { CssClasses, FirstGameLevelId } from '../../../../../interfaces/types';
import { SourceBlock, data } from './source-block';
import { clickAppend, getCurrentSentence } from './extra-functions';
import './game-page.css';
import ContinueCheckButton from '../../../button/continue-check-button';
import { getNextLevelId } from '../../../../logic/continue-button-logic';

// взаимодействие блоков result,  source, кнопки продолжить/проверка
export default class GameContainerMain extends View {
  resultBlock: ResultBlock;

  sourceBlock: SourceBlock;

  continueCheckButton: ContinueCheckButton;

  sourceArray: HTMLElement[];

  resultArray: Element[];

  currentSentenceNumber: number;

  constructor() {
    const prop = {
      tag: 'div',
      classNames: [CssClasses.gameContainerMain],
    };
    super(prop);
    const initGameLevelID: FirstGameLevelId = '1_01';
    this.resultBlock = new ResultBlock(initGameLevelID);
    this.sourceBlock = new SourceBlock(initGameLevelID);
    this.continueCheckButton = new ContinueCheckButton();
    this.createGameView();
    this.currentSentenceNumber = 0; // номер предложения, то есть элемент массива(самый большой это 9)
    this.resultArray = Array.from(
      this.resultBlock.getHtmlelement().children[this.currentSentenceNumber].children,
    );
    this.sourceArray = Array.from(this.sourceBlock.getHtmlelement().children) as HTMLElement[];
    this.addEventListeners();
  }

  createGameView(): void {
    this.getHtmlelement().append(
      this.resultBlock.getHtmlelement(),
      this.sourceBlock.getHtmlelement(),
      this.continueCheckButton.getHtmlelement(),
    );
  }

  removeGameView(): void {
    this.getHtmlelement().innerHTML = '';
  }

  updateView(newlevelId: string): void {
    this.resultBlock = new ResultBlock(newlevelId);
    this.sourceBlock = new SourceBlock(newlevelId);
    this.continueCheckButton = new ContinueCheckButton();
    this.currentSentenceNumber = 0;
    this.resultArray = Array.from(
      this.resultBlock.getHtmlelement().children[this.currentSentenceNumber].children,
    );
    this.sourceArray = Array.from(this.sourceBlock.getHtmlelement().children) as HTMLElement[];
    this.removeGameView();
    this.createGameView();
    this.addEventListeners();
  }

  getNewResultArray() {
    return Array.from(
      this.resultBlock.getHtmlelement().children[this.currentSentenceNumber].children,
    );
  }

  getNewSourceArray() {
    return Array.from(this.sourceBlock.getHtmlelement().children) as HTMLElement[];
  }

  listenWordContainersClicks(
    res: Element[],
    source: HTMLElement[],
    cur: Array<string>,
    con: ContinueCheckButton,
  ) {
    if (this.sourceBlock.wordContainersBlock) {
      this.sourceBlock.wordContainersBlock.forEach((wordContainerEl) => {
        const wordContainer = wordContainerEl;
        (wordContainer.firstElementChild as HTMLElement).onclick = (e) =>
          clickAppend(e, res, source, cur, con);
      });
    }
  }

  toNextGame() {
    const currentId = this.sourceBlock?.currentGame?.currentRound?.levelData?.id;
    const newGameId = getNextLevelId(data, currentId as string);
    this.updateView(newGameId);
  }

  addEventListeners(): void {
    this.listenWordContainersClicks(
      this.resultArray,
      this.sourceArray,
      this.sourceBlock.currentSentence,
      this.continueCheckButton,
    );

    this.continueCheckButton.getHtmlelement().addEventListener('click', () => {
      if (this.continueCheckButton.getHtmlelement().textContent === 'Continue') {
        this.continueCheckButton.getHtmlelement().setAttribute('disabled', 'disabled');
        if (this.sourceBlock.currentGame?.currentRound.words[this.currentSentenceNumber + 1]) {
          this.currentSentenceNumber += 1;
          this.sourceBlock.clearSourceBlock();
          this.sourceBlock.currentSentence = getCurrentSentence(
            this.sourceBlock.currentGame,
            this.currentSentenceNumber,
          );
          this.sourceBlock.createSourceBlock();
          this.sourceBlock.wordContainersBlock = this.getNewSourceArray();
          this.sourceArray = this.getNewSourceArray();
          this.resultArray = this.getNewResultArray();
          this.listenWordContainersClicks(
            this.resultArray,
            this.sourceArray,
            this.sourceBlock.currentSentence,
            this.continueCheckButton,
          );
        } else {
          this.toNextGame();
        }
      }
    });
  }
}
