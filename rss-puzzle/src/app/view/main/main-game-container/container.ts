import './main-game-container.css';
import { CssClasses } from '../../../../interfaces/types';
import View from '../../view';

export default class Container extends View {
  constructor() {
    const ContainerParameters = {
      tag: 'div',
      classNames: [CssClasses.container],
    };
    super(ContainerParameters);
  }

  setContent(elemForSet: HTMLElement) {
    const anotherElement = elemForSet;
    const currentElem = this.getHtmlelement();
    while (currentElem.firstChild) {
      currentElem.firstChild.remove();
    }
    currentElem.append(anotherElement);
  }
}
