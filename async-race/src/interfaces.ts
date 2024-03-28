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
  'garageChildren' = 11,
  'page' = 7,
}
