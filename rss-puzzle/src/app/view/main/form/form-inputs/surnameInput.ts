import View from '../../../view';
import { CssClasses } from '../../../../../interfaces/types';

export default class FormSurnameInput extends View {
  constructor() {
    const formInputParameters = {
      tag: 'input',
      classNames: [CssClasses.input, CssClasses.inputSurname],
      types: [
        ['type', 'text'],
        ['required', 'required'],
        ['id', 'surname'],
        ['pattern', '^[A-Z][\\-a-zA-z]+$'],
        ['minlength', '4'],
      ],
    };
    super(formInputParameters);
  }
}
