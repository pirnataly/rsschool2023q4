export interface Parameters {
  tag: string;
  classNames: string[];
  textContent?: string;
  callback?: () => void;
  types?: AttributeType[];
}

export enum CssClasses {
  header = 'header',
  button = 'button',
  headerButton = 'header-button',
  formButton = 'form-button',
  wrapper = 'wrapper',
  form = 'form',
  main = 'main',
  formWrapper = 'form-wrapper',
  formRow = 'form-row',
  input = 'input',
  inputName = 'input-name',
  inputSurname = 'input-surname',
  mainGameContainer = 'main-game-container',
  startPage = 'start-page',
  container = 'container',
  gamePage = 'game-page',
  description = 'description',
}

export type AttributeType = string[];
