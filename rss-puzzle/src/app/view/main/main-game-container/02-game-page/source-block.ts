import View from '../../../view';
import './game-page.css';
import { CssClasses } from '../../../../../interfaces/types';
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

export default class SourceBlock extends View {
  wordContainersBlock: HTMLCollection;

  constructor() {
    const SourceBlockParameters = {
      tag: 'div',
      classNames: [CssClasses.sourceBlock],
    };
    super(SourceBlockParameters);
    this.createSourceBlock();
    this.wordContainersBlock = this.getHtmlelement().children;
  }

  createSourceBlock(): void {
    const currentGame = getChosenGameObj(data, '1_01');
    const currentSentenceAsArray = getCurrentSentence(currentGame) as Array<string>;
    shuffleSentence(currentSentenceAsArray);
    makeWordsContainer(this.getHtmlelement(), currentSentenceAsArray.length);
    createWordCard(this.getHtmlelement().children, currentSentenceAsArray);
    // console.log(wordCard.parentElement.parentElement);
  }

  clearSourceBlock(): void {
    this.getHtmlelement().innerHTML = '';
  }
}
