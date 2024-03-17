import View from '../../../view';
import './game-page.css';
import { CssClasses, Round } from '../../../../../interfaces/types';
import data1 from '../../../../../data/wordCollectionLevel1';
import data2 from '../../../../../data/wordCollectionLevel2';
import data3 from '../../../../../data/wordCollectionLevel3';
import data4 from '../../../../../data/wordCollectionLevel4';
import data5 from '../../../../../data/wordCollectionLevel5';
import data6 from '../../../../../data/wordCollectionLevel6';
import {
  getChosenGameObj,
  getCurrentSentence,
  shuffleSentence,
  createWordCard,
  makeWordsContainer,
} from './extra-functions';

export const data = [...data1, ...data2, ...data3, ...data4, ...data5, ...data6];

export class SourceBlock extends View {
  wordContainersBlock: Element[] | null;

  currentSentence: Array<string>;

  currentGame:
    | {
        currentRound: Round;
        currentGameIndex: number;
      }
    | undefined;

  constructor(levelId: string) {
    const SourceBlockParameters = {
      tag: 'div',
      classNames: [CssClasses.sourceBlock],
    };
    super(SourceBlockParameters);
    this.currentGame = getChosenGameObj(data, levelId);
    const numberOfSentenceInChosenGame = 0; // номер предложения при загрузке раунда
    this.currentSentence = getCurrentSentence(
      this.currentGame,
      numberOfSentenceInChosenGame,
    ) as Array<string>;
    this.createSourceBlock();
    this.wordContainersBlock = Array.from(this.getHtmlelement().children);
  }

  createSourceBlock(): void {
    const currentSentenceAsArray = this.currentSentence.slice(0, this.currentSentence.length);
    shuffleSentence(currentSentenceAsArray);
    makeWordsContainer(this.getHtmlelement(), currentSentenceAsArray.length);
    createWordCard(this.getHtmlelement().children, currentSentenceAsArray);
  }

  clearSourceBlock(): void {
    this.getHtmlelement().innerHTML = '';
  }
}
