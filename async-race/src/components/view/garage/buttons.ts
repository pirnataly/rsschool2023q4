export default class Button {
  isDisabled: boolean;

  button: HTMLButtonElement;

  constructor(buttonName: string) {
    this.button = document.createElement('button');
    this.button.textContent = buttonName.toUpperCase();
    this.isDisabled = true;
  }

  getHtml() {
    return this.button;
  }
}
