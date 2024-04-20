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
  ['id', 'passwordInput'],
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

export const typicalButtonAttributes = [['type', 'button']];

export const aboutButtonProperties = {
  className: 'about-button',
  textContent: 'About',
};

export const ExitButtonProperties = {
  className: 'exit',
  textContent: 'Continue',
};

export const prevButtonProperties = {
  className: 'prev-button',
  textContent: 'Back',
};

export const headerAboutButtonProperties = {
  className: 'header_about-button',
  textContent: 'About',
};

export const logoutButtonProperties = {
  className: 'logout-button',
  textContent: 'Logout',
};

export const searchAttributes = [
  ['type', 'search'],
  ['placeholder', 'Find ...'],
];

export interface FormInterface {
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

  checkValidation: (ev: SubmitEvent) => boolean;

  makeButtonBeClicked: (e: Event) => void;

  getHtml: () => HTMLFormElement;
}

export const appConstant = {
  routes: {
    login: '/login',
    about: '/about',
    main: '/main',
  },
};

export type User = {
  login: string;

  password: string;

  isLogined: false;

  error: string;

  activeUsers: UserFromResponse[];

  inactiveUsers: UserFromResponse[];

  newUser?: UserFromResponse;
};

export interface ObserverInterface {
  update(param: User, id: string): void;
}

export interface UserData {
  observers: HTMLElement[];
  user: User;
  subscribe: (observer: HTMLElement) => void;
  notify: () => void;
}

export type UserFromResponse = {
  login: string;
  isLogined: boolean;
};
