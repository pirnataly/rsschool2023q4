export function createInput(attributesPairs: string[][]): HTMLInputElement {
  const input = document.createElement('input');
  attributesPairs.forEach(([key, value]) => input.setAttribute(key, value));
  return input;
}

export function createLabel(text: string, forValue: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.textContent = text;
  label.setAttribute('for', forValue);
  return label;
}

export function createButton(
  attributesPairs: string[][],
  { textContent = 'Login', className = 'button' },
): HTMLButtonElement {
  const button = document.createElement('button');
  attributesPairs.forEach(([key, value]) => button.setAttribute(key, value));
  button.textContent = textContent;
  button.className = className;
  return button;
}

export function createElement(classname: string, tag = 'div'): HTMLElement | HTMLDivElement {
  const el = document.createElement(tag);
  el.className = classname;
  return el;
}
