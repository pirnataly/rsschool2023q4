import View from '../../view';
import { CssClasses } from '../../../../interfaces/types';
import './form.css';
import FormRow from './formRow';

export default class Form extends View {
  private formRowButton: HTMLElement | undefined;

  private formRowName: HTMLElement | undefined;

  private formRowSurname: HTMLElement | undefined;

  constructor() {
    const formParameters = {
      tag: 'form',
      classNames: [CssClasses.form],
    };
    super(formParameters);
    this.createForm();
  }

  createForm() {
    const formWrapper = new View({
      tag: 'ul',
      classNames: [CssClasses.formWrapper],
    }).getHtmlelement();
    this.formRowName = new FormRow().createFormRowName(this.makeButtonBeClicked.bind(this));
    this.formRowSurname = new FormRow().createFormRowSurname(this.makeButtonBeClicked.bind(this));
    this.formRowButton = new FormRow().createFormRowButton();

    formWrapper.append(this.formRowName);
    formWrapper.append(this.formRowSurname);
    formWrapper.append(this.formRowButton);
    this.getHtmlelement().append(formWrapper);
  }

  makeButtonBeClicked(e: Event) {
    const inputSurname = this.formRowSurname?.lastElementChild as HTMLInputElement;
    const inputName = this.formRowName?.lastElementChild as HTMLInputElement;
    const anotherInput = e.target === inputName ? inputSurname : inputName;
    if (anotherInput.validity.valid) {
      this.formRowButton?.firstElementChild?.removeAttribute('disabled');
    }
  }
}
