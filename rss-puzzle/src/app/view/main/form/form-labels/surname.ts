import { CssClasses } from '../../../../../interfaces/types';
import View from '../../../view';

export default class SurnameLabel extends View {
  constructor() {
    const SurnameParameters = {
      tag: 'label',
      classNames: [CssClasses.formRow],
      textContent: 'Surname',
      types: [['for', 'Surname']],
    };
    super(SurnameParameters);
  }
}
