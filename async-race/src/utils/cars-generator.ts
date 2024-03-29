export const carNames = [
  ' BMW',
  'Volvo',
  'Volkswagen',
  'Toyota',
  'Skoda',
  'Renault',
  'Peugeot',
  'Opel',
  'Maserati',
  'Suzuki',
  'Kia',
  'Alfa-Romeo',
  'Bentley',
];
export const carModels = [
  'Clio',
  'Megane',
  'Dingo',
  'Lancer',
  'Accord',
  'Civic',
  '51',
  '412',
  'Passat',
  'Golf',
  '130RS',
  'Fabia',
  'Astra',
];

export function randomColor(): string {
  const color = `#${Math.random().toString(16).slice(3, 9)}`;
  return color;
}

export function getRandomName(carnames: string[]) {
  const namesLength = carnames.length;
  const randomCarName = carnames[Math.trunc(Math.random() * namesLength)];
  return randomCarName;
}

export function getRandomModel(carmodels: string[]) {
  const carModelsLength = carmodels.length;
  const randomcarModel = carmodels[Math.trunc(Math.random() * carModelsLength)];
  return randomcarModel;
}
