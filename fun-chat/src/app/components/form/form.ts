import './form.css';
import {
  formButtonAttributes,
  formButtonProperties,
  loginAttributes,
  passwordAttributes,
} from '../../interfaces';
import setLocalStorage from '../../../services/local-storage';
import { createButton, createInput, createLabel } from '../../../utils/create-form-elements';
import { removeMessage, setCoords, showError } from '../../../utils/validate-functions';
import aboutButton from '../aboutButton';

class Form {
  formContainer: HTMLFormElement;

  loginRow: HTMLLIElement;

  passwordRow: HTMLLIElement;

  heading: HTMLHeadingElement;

  loginInput: HTMLInputElement;

  passwordInput: HTMLInputElement;

  formButton: HTMLButtonElement;

  aboutButton: HTMLButtonElement;

  loginMessageError: HTMLSpanElement;

  passwordError: HTMLSpanElement;

  constructor() {
    this.formContainer = document.createElement('form');
    this.formContainer.setAttribute('novalidate', 'novalidate');
    this.formContainer.className = 'form';
    this.heading = document.createElement('h3');
    this.heading.textContent = 'Authorization';

    this.loginRow = document.createElement('li');
    const loginLabel = createLabel('Login', 'loginValue');
    this.loginInput = createInput(loginAttributes);
    this.loginMessageError = document.createElement('span');

    this.loginInput.oninput = (ev) => {
      if (this.loginInput.validity.valid) {
        removeMessage(this.loginMessageError);
        this.makeButtonBeClicked(ev);
      } else {
        setCoords(this.loginInput, this.loginMessageError, 'error');
        showError(this.loginInput, this.loginMessageError);
        this.formButton.setAttribute('disabled', 'disabled');
      }
    };

    this.loginRow.append(loginLabel, this.loginInput, this.loginMessageError);
    this.passwordRow = document.createElement('li');
    const passwordLabel = createLabel('Password', 'passwordValue');
    this.passwordInput = createInput(passwordAttributes);
    this.passwordError = document.createElement('span');
    this.passwordInput.oninput = (e) => {
      if (this.passwordInput.validity.valid) {
        removeMessage(this.passwordError);
        this.makeButtonBeClicked(e);
      } else {
        setCoords(this.passwordInput, this.passwordError, 'error');
        showError(this.passwordInput, this.passwordError);
        this.formButton.setAttribute('disabled', 'disabled');
      }
    };

    this.passwordRow.append(passwordLabel, this.passwordInput, this.passwordError);
    this.formButton = createButton(formButtonAttributes, formButtonProperties);
    this.aboutButton = aboutButton;
    this.formContainer.append(
      this.heading,
      this.loginRow,
      this.passwordRow,
      this.formButton,
      this.aboutButton,
    );
    this.formContainer.onsubmit = (ev) => {
      if (!this.loginInput.validity.valid) {
        ev.preventDefault();
        showError(this.loginInput, this.loginMessageError);
      }
      if (!this.passwordInput.validity.valid) {
        ev.preventDefault();
        showError(this.passwordInput, this.passwordError);
      }
      if (this.passwordInput.validity.valid && this.loginInput.validity.valid) {
        ev.preventDefault();
        setLocalStorage('login', this.loginInput.value);
        setLocalStorage('password', this.passwordInput.value);
        // this.login();
      }
    };
  }

  makeButtonBeClicked(e: Event) {
    console.log(e.target);
    // const inputSurname = this.formRowSurname?.children[1] as HTMLInputElement;
    // const inputName = this.formRowName?.children[1] as HTMLInputElement;
    const anotherInput = e.target === this.loginInput ? this.passwordInput : this.loginInput;
    if (anotherInput.validity.valid) {
      this.formButton.removeAttribute('disabled');
    }
  }

  getHtml() {
    return this.formContainer;
  }
}

const form = new Form();
export default form;
