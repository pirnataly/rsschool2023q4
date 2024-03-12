import View from '../../view';
import './form.css';
import { CssClasses } from '../../../../interfaces/types';
import FormButton from '../../button/formButton';
import FormNameInput from './form-inputs/nameInput';
import FirstNameLabel from './form-labels/formLabel';
import SurnameLabel from './form-labels/surname';
import FormSurnameInput from './form-inputs/surnameInput';

export default class FormRow extends View {
  constructor() {
    const formRowParameters = {
      tag: 'li',
      classNames: [CssClasses.formRow],
    };
    super(formRowParameters);
  }

  createFormRowName(callback?: (ev: Event) => void): HTMLElement {
    const labelName = new FirstNameLabel().getHtmlelement();
    const formRowName = this.getHtmlelement();
    const inputName = new FormNameInput().getHtmlelement() as HTMLInputElement;
    inputName.oninput = (event: Event) => {
      if (inputName.validity.valid) {
        callback?.(event);
      }
    };
    formRowName.append(labelName, inputName);
    return formRowName;
  }

  createFormRowSurname(callback?: (ev: Event) => void): HTMLElement {
    const labelSurname = new SurnameLabel().getHtmlelement();
    const formRowSurname = this.getHtmlelement();
    const inputSurname = new FormSurnameInput().getHtmlelement() as HTMLInputElement;
    inputSurname.oninput = (event: Event) => {
      if (inputSurname.validity.valid) {
        callback?.(event);
      }
    };
    formRowSurname.append(labelSurname, inputSurname);
    return formRowSurname;
  }

  createFormRowButton(): HTMLElement {
    const formRowButton = this.getHtmlelement();
    const formButton = new FormButton().getHtmlelement();
    formRowButton.append(formButton);
    return formRowButton;
  }
}
