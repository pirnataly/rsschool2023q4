import View from '../../view';
import './form.css';
import { CssClasses } from '../../../../interfaces/types';
import FormButton from '../../button/form-button';
import FormNameInput from './form-inputs/nameInput';
import FirstNameLabel from './form-labels/formLabel';
import SurnameLabel from './form-labels/surname';
import FormSurnameInput from './form-inputs/surnameInput';
import { removeMessage, setCoords, showError } from '../../../utils/validate-functions';

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
    const nameError = document.createElement('span');
    inputName.oninput = (event: Event) => {
      if (inputName.validity.valid) {
        removeMessage(nameError);
        callback?.(event);
      } else {
        setCoords(inputName, nameError, 'error');
        showError(inputName, nameError);
      }
    };
    formRowName.append(labelName, inputName, nameError);
    return formRowName;
  }

  createFormRowSurname(callback?: (ev: Event) => void): HTMLElement {
    const labelSurname = new SurnameLabel().getHtmlelement();
    const formRowSurname = this.getHtmlelement();
    const inputSurname = new FormSurnameInput().getHtmlelement() as HTMLInputElement;
    const surnameError = document.createElement('span');
    inputSurname.oninput = (event: Event) => {
      if (inputSurname.validity.valid) {
        removeMessage(surnameError);
        callback?.(event);
      } else {
        setCoords(inputSurname, surnameError, 'error');
        showError(inputSurname, surnameError);
      }
    };
    formRowSurname.append(labelSurname, inputSurname, surnameError);
    return formRowSurname;
  }

  createFormRowButton(): HTMLElement {
    const formRowButton = this.getHtmlelement();
    const formButton = new FormButton().getHtmlelement();
    formRowButton.append(formButton);
    return formRowButton;
  }
}
