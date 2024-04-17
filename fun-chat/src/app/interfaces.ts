export const loginAttributes = [
  ['type', 'text'],
  ['required', 'required'],
  ['id', 'loginValue'],
  ['pattern', '^[A-Z][\\-a-zA-z]+$'],
  ['minlength', '3'],
  ['placeholder', 'Enter login'],
];

export const passwordAttributes = [
  ['type', 'password'],
  ['required', 'required'],
  ['id', 'surname'],
  ['pattern', '^[A-Z][\\-a-zA-z]+$'],
  ['minlength', '4'],
  ['placeholder', 'Enter password'],
];

export const formButtonAttributes = [
  ['type', 'submit'],
  ['disabled', 'disabled'],
];

export const formButtonProperties = {
  className: 'form-button',
  textContent: 'Enter',
};

export const aboutButtonAttributes = [['type', 'button']];

export const aboutButtonProperties = {
  className: 'about-button',
  textContent: 'About',
};
