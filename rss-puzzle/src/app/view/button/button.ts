import './button.css';
import View from '../view';
import { CssClasses } from '../../../interfaces/types';

export default class Button extends View {
  constructor() {
    const buttonParameters = {
      tag: 'button',
      classNames: [CssClasses.button],
    };
    super(buttonParameters);
    this.createView(buttonParameters);
  }
}
