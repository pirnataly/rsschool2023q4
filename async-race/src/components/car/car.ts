import './car-styles.css';
import getCar from '../view/car-image';

export default class Car {
  color: string;

  startButton: HTMLButtonElement;

  stopButton: HTMLButtonElement;

  selectButton: HTMLButtonElement;

  removeButton: HTMLButtonElement;

  carBlockContainer: HTMLDivElement;

  name: HTMLSpanElement;

  roadContainer: HTMLDivElement;

  carImage: null | SVGSVGElement;

  constructor(name: string, color: string) {
    this.name = document.createElement('span');
    this.name.textContent = name;
    this.color = color;
    this.carBlockContainer = document.createElement('div');
    this.roadContainer = document.createElement('div');
    this.startButton = document.createElement('button');
    this.stopButton = document.createElement('button');
    this.selectButton = document.createElement('button');
    this.removeButton = document.createElement('button');
    this.carImage = null;
    this.renderCar();
  }

  renderCar() {
    const buttonContainer = document.createElement('div');

    const componentsArray = [
      this.carBlockContainer,
      buttonContainer,
      this.roadContainer,
      this.startButton,
      this.stopButton,
      this.selectButton,
      this.removeButton,
    ];
    const classes = [
      'car-block-container',
      'button-container',
      'road-container',
      'start-button',
      'stop-button',
      'select-button',
      'remove-button',
    ];
    componentsArray.forEach((elem, index) => {
      const el = elem;
      el.className = classes[index];
    });

    buttonContainer.append(this.selectButton, this.removeButton, this.name);
    this.roadContainer.append(this.startButton, this.stopButton);
    this.carBlockContainer.append(buttonContainer, this.roadContainer);
    this.carImage = getCar(this.getRoad(), this.color);
  }

  getHtml() {
    return this.carBlockContainer;
  }

  getRoad() {
    return this.roadContainer;
  }
}
