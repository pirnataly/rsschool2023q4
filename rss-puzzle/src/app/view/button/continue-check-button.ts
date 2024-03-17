import View from '../view';
import { CssClasses } from '../../../interfaces/types';

export default class ContinueCheckButton extends View {
  constructor() {
    const formButtonParameters = {
      tag: 'button',
      classNames: [CssClasses.button, CssClasses.continueCheckButton],
      types: [
        ['type', 'button'],
        ['disabled', 'disabled'],
      ],
      textContent: 'Check',
    };
    super(formButtonParameters);
  }
}
