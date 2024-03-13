import './start-page.css';
import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';
import {
  createDescriptionText,
  createGreeting,
  createHeading,
} from './creating-elements-functions';

export default class Description extends View {
  constructor() {
    const descriptionParameters = {
      tag: 'div',
      classNames: [CssClasses.description],
    };
    super(descriptionParameters);
    this.createDescriptionBlock();
  }

  createDescriptionBlock() {
    const heading = createHeading();
    const gameDescription = createDescriptionText();
    const greeting = createGreeting();
    this.getHtmlelement().append(heading, gameDescription, greeting);
  }
}
