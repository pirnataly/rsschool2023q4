import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';

export default class FormNameInput extends View {
  constructor() {
    const formInputParameters = {
      tag: 'input',
      classNames: [CssClasses.input, CssClasses.inputName],
      types: [
        ['type', 'text'],
        ['required', 'required'],
        ['id', 'firstName'],
        ['pattern', '^[A-Z][\\-a-zA-z]+$'],
        ['minlength', '3'],
      ],
    };
    super(formInputParameters);
  }
}
