import { clearLocalStorage, isLocalStorageGetItem } from '../services/local-storage';

export function deleteBodyBackground() {
  document.body.classList.remove('body');
}

export default function changeBodyBackground(
  variable: HTMLElement,
  elem1: HTMLElement,
  elem2: HTMLElement,
) {
  if (variable === elem1) {
    deleteBodyBackground();
  }
  if (variable === elem2) {
    document.body.classList.add('body');
  }
}

export function changeLogoutButtonState(variableButton: HTMLButtonElement, func: () => void) {
  const variable = variableButton;
  if (isLocalStorageGetItem()) {
    variable.removeAttribute('disabled');
    variable.classList.remove('header-button');
  } else {
    variable.setAttribute('disabled', 'disabled');
    variable.classList.add('header-button');
  }
  variable.onclick = () => {
    clearLocalStorage();
    func();
  };
}
