import { CssClasses } from '../../../../../interfaces/types';
import View from '../../../view';

export default class FirstNameLabel extends View {
  constructor() {
    const firstNameParameters = {
      tag: 'label',
      classNames: [CssClasses.formRow],
      textContent: 'First Name',
      types: [['for', 'firstName']],
    };
    super(firstNameParameters);
  }
}
