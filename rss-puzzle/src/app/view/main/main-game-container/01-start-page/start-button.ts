import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';

export default class StartButton extends View {
  constructor() {
    const startButtonParameters = {
      tag: 'button',
      classNames: [CssClasses.button, CssClasses.startButton],
      textContent: 'Start',
      type: ['button', 'button'],
    };
    super(startButtonParameters);
  }
}
