import { aboutButtonProperties } from '../interfaces';
import { createButton } from '../../utils/elements-creators';
import appStore from '../../utils/app-store';

export default class AboutButton {
  aboutButton: HTMLButtonElement;

  constructor(
    attributesPairs: string[][],
    { textContent = 'Login', className = 'button' } = aboutButtonProperties,
  ) {
    this.aboutButton = createButton(attributesPairs, { textContent, className });
    this.aboutButton.addEventListener('click', () => {
      appStore.emit();
    });
  }

  getHtml() {
    return this.aboutButton as HTMLButtonElement;
  }
}
