export interface CarInterface {
  name: string;
  color: string;
  id: number;
}

export type Specification = {
  velocity: number;
  distance: number;
};

export enum Limits {
  'page' = 7,
}
