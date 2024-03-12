import View from '../../view';
import { CssClasses } from '../../../../interfaces/types';
import './form.css';
import FormRow from './formRow';
import { showError } from '../../../utils/validate-functions';
import setLocalStorage from '../../../services/local-storage';

export default class Form extends View {
  private formRowButton: HTMLElement | undefined;

  private formRowName: HTMLElement | undefined;

  private formRowSurname: HTMLElement | undefined;

  private login: () => void;

  constructor(login: () => void) {
    const formParameters = {
      tag: 'form',
      classNames: [CssClasses.form],
    };
    super(formParameters);
    this.createForm();
    this.login = login;
  }

  createForm() {
    const formWrapper = new View({
      tag: 'ul',
      classNames: [CssClasses.formWrapper],
    }).getHtmlelement();
    this.formRowName = new FormRow().createFormRowName(this.makeButtonBeClicked.bind(this));
    this.formRowSurname = new FormRow().createFormRowSurname(this.makeButtonBeClicked.bind(this));
    this.formRowButton = new FormRow().createFormRowButton();
    formWrapper.append(this.formRowName, this.formRowSurname, this.formRowButton);
    const form = this.getHtmlelement();
    form.append(formWrapper);
    form.setAttribute('novalidate', 'novalidate');
    form.onsubmit = (ev) => {
      const inputField = this.formRowName?.children[1] as HTMLInputElement;
      const surnameField = this.formRowSurname?.children[1] as HTMLInputElement;
      if (!inputField.validity.valid) {
        const messageError = this.formRowName?.lastElementChild as HTMLSpanElement;
        ev.preventDefault();
        showError(inputField, messageError);
      }
      if (!surnameField.validity.valid) {
        const messageError = this.formRowSurname?.lastElementChild as HTMLSpanElement;
        ev.preventDefault();
        showError(surnameField, messageError);
      }
      if (surnameField.validity.valid && inputField.validity.valid) {
        ev.preventDefault();
        setLocalStorage('firstname', inputField.value);
        setLocalStorage('surname', surnameField.value);
        this.login();
      }
    };
  }

  makeButtonBeClicked(e: Event) {
    const inputSurname = this.formRowSurname?.children[1] as HTMLInputElement;
    const inputName = this.formRowName?.children[1] as HTMLInputElement;
    const anotherInput = e.target === inputName ? inputSurname : inputName;
    if (anotherInput.validity.valid) {
      this.formRowButton?.firstElementChild?.removeAttribute('disabled');
    }
  }
}
