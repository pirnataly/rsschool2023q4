export interface CarInterface {
  id: number;
  name: HTMLSpanElement;
  color: string;
  carBlockContainer: HTMLDivElement;
  roadContainer: HTMLDivElement;
  startButton: HTMLButtonElement;
  stopButton: HTMLButtonElement;
  selectButton: HTMLButtonElement;
  removeButton: HTMLButtonElement;
  carImage: SVGSVGElement | null;
  renderCar: () => void;
  getHtml: () => HTMLDivElement;
  getRoad: () => HTMLDivElement;
}

export type Specification = {
  velocity: number;
  distance: number;
};

export enum Limits {
  'garageChildren' = 12,
  'pageGarage' = 7,
  'pageWinners' = 10,
  'columns' = 5,
}

export const classes = [
  'form-container',
  'name-input',
  'color-input',
  'create-button',
  'new-name-input',
  'new-color-input',
  'update-button',
  'race-button',
  'reset-button',
  'generate-button',
];

export type Winner = {
  id: number;
  time: number;
  wins: number;
};

export type ResultRow = {
  id: number;
  time: number;
  wins: number;
  color: string;
  name: string;
}[];

export type Car = {
  id: number;
  name: string;
  color: string;
};

export type Params = {
  page: number;
  limit: Limits.pageWinners;
  sort?: string | undefined;
  order?: string | undefined;
};
