import './form.css';
import {
  aboutButtonProperties,
  formButtonAttributes,
  formButtonProperties,
  loginAttributes,
  ObserverInterface,
  passwordAttributes,
  typicalButtonAttributes,
  User,
} from '../../interfaces';

import { removeMessage, setCoords, showError } from '../../../utils/validate-functions';
import AboutButton from '../aboutButton';
import { setSessionStorage } from '../../../services/session-storage';
import curUser from '../../../utils/current-user';
import socket from '../../../services/socket';
import { createButton, createInput, createLabel } from '../../../utils/elements-creators';

export default class Form implements ObserverInterface {
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
    this.aboutButton = new AboutButton(typicalButtonAttributes, aboutButtonProperties).getHtml();
    this.formContainer.append(
      this.heading,
      this.loginRow,
      this.passwordRow,
      this.formButton,
      this.aboutButton,
    );
    this.addEventListeners();
    curUser.subscribe(this);
  }

  checkValidation(ev: SubmitEvent): boolean {
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
      this.setCurUser();
      setSessionStorage(curUser);
    }
    return true;
  }

  makeButtonBeClicked(e: Event) {
    const anotherInput = e.target === this.loginInput ? this.passwordInput : this.loginInput;
    if (anotherInput.validity.valid) {
      this.formButton.removeAttribute('disabled');
    }
  }

  update(param: User) {
    this.loginInput.value = param.login;
    this.passwordInput.value = param.login;
  }

  setCurUser() {
    curUser.user.login = this.loginInput.value;
    curUser.user.password = this.passwordInput.value;
  }

  addEventListeners() {
    this.formContainer.addEventListener('submit', (e: SubmitEvent) => {
      if (this.checkValidation(e)) {
        socket.send(
          JSON.stringify({
            id: 'ul',
            type: 'USER_LOGIN',
            payload: {
              user: {
                login: this.loginInput.value,
                password: this.passwordInput.value,
              },
            },
          }),
        );
        // console.log(curUser,'curUser from form')
      }
    });
  }

  getHtml() {
    return this.formContainer;
  }
}

export const form = new Form();
