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
  startButton = 'start-button',
  resultBlock = 'result-block',
  gameContainerMain = 'game-container-main',
  sourceBlock = 'source-block',
  continueCheckButton = 'continue-button',
}

export type AttributeType = string[];

export type Rounds = Round[];

export type Round = {
  levelData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
  }[];
};
export type CountOfRow = 10;

export type FirstGameLevelId = '1_01';

export type CurrentRound = {
  currentRound: Round;
  currentGameIndex: number;
};
