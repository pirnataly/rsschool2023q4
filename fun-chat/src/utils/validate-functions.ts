export function getCoords(node: HTMLElement): DOMRect {
  const coords = node.getBoundingClientRect();
  return coords;
}

export function setCoords(parent: HTMLInputElement, nodeElem: HTMLSpanElement, text: string): void {
  const node = nodeElem;
  node.classList.remove(text);
  node.style.left = `${getCoords(parent).left}px`;
  node.style.top = `${getCoords(parent).bottom}px`;
  node.style.width = `${getCoords(parent).width}px`;
}

export function removeMessage(nodeElem: HTMLElement) {
  const node = nodeElem;
  node.textContent = '';
  node.classList.add('error');
}

export function showError(nodeElem: HTMLInputElement, message: HTMLSpanElement): void {
  const messageBlock = message;
  const node = nodeElem;
  if (node.validity.valueMissing) {
    messageBlock.textContent =
      node.id === 'loginValue'
        ? 'You need to enter your login.'
        : 'You need to enter your password.';
  } else if (node.validity.patternMismatch) {
    if (node.value[0] !== node.value[0].toUpperCase()) {
      messageBlock.textContent = 'The first letter must be in uppercase ';
    } else {
      messageBlock.textContent = 'Entered value needs to be in English';
    }
  } else if (node.validity.tooShort) {
    messageBlock.textContent = `Name should be at least ${node.minLength} characters`;
  }
  messageBlock.className = 'error active';
}
