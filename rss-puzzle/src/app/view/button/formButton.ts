import { CssClasses } from '../../../interfaces/types';
import View from '../view';

export default class FormButton extends View {
  constructor() {
    const formButtonParameters = {
      tag: 'button',
      classNames: [CssClasses.button, CssClasses.formButton],
      types: [
        ['type', 'submit'],
        ['disabled', 'disabled'],
      ],
      textContent: 'Login',
    };
    super(formButtonParameters);
  }
}
