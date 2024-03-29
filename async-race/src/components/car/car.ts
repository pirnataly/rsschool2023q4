import './car-styles.css';
import getCar from '../view/car-image';
import getFlag from '../view/flag-image';
import {
  fetchDeleteCar,
  fetchDriveEngine,
  fetchStartEngine,
  fetchStopEngine,
} from '../../services/service';
import getDuration from '../../utils/animation';
import store from '../../utils/store';
import winMessage from '../../utils/message';
// import winMessage from "../../utils/message";

export default class Car {
  color: string;

  static raceWinner: Car[];

  startButton: HTMLButtonElement;

  stopButton: HTMLButtonElement;

  selectButton: HTMLButtonElement;

  removeButton: HTMLButtonElement;

  carBlockContainer: HTMLDivElement;

  name: HTMLSpanElement;

  roadContainer: HTMLDivElement;

  carImage: null | SVGSVGElement;

  id: number;

  timerId: NodeJS.Timeout | undefined;

  constructor(name: string, color: string, id: number) {
    Car.raceWinner = [];
    this.timerId = undefined;
    this.id = id;
    this.name = document.createElement('span');
    this.name.textContent = name;
    this.color = color;
    this.carBlockContainer = document.createElement('div');
    this.roadContainer = document.createElement('div');
    this.startButton = document.createElement('button');
    this.startButton.textContent = 'S';
    this.stopButton = document.createElement('button');
    this.stopButton.textContent = 'P';
    this.stopButton.setAttribute('disabled', 'disabled');
    this.selectButton = document.createElement('button');
    this.selectButton.textContent = 'SELECT';
    this.removeButton = document.createElement('button');
    this.removeButton.textContent = 'REMOVE';
    this.carImage = null;
    this.renderCar();
    this.addEventListeners();
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
    getFlag(this.getRoad());
    this.carImage = getCar(this.getRoad(), this.color);
  }

  addEventListeners() {
    this.startButton.addEventListener('click', async () => {
      this.start();
    });
    this.stopButton.addEventListener('click', () => {
      this.stop();
    });
    this.selectButton.addEventListener('click', () => {
      store.activeCarId = this.id;
      store.activeCarName = this.name.textContent as string;
      store.activeCarColor = this.color;
      store.emit();
    });

    this.removeButton.addEventListener('click', () => {
      fetchDeleteCar(this.id);
    });
  }

  async start() {
    const spec = await fetchStartEngine(this.id);
    if (spec) {
      const duration = getDuration(spec);
      this.carBlockContainer.dataset.value = 'animated';
      this.stopButton.removeAttribute('disabled');
      this.carImage?.classList.add('car-img_animated');
      this.carImage?.classList.remove('car-img_animated-pause');
      this.startButton.setAttribute('disabled', 'disabled');
      (this.carImage as SVGSVGElement).style.animationDuration = `${Math.trunc(duration)}ms`;
      await this.drive(duration);
    }
  }

  async drive(duration: number) {
    this.timerId = setTimeout(
      () => {
        (this.carImage as SVGSVGElement).classList.add('car-img_animated-pause');
        if (Car.raceWinner.length === 0) {
          Car.raceWinner.push(this);
          winMessage.getHtml().style.display = 'flex';
          winMessage.winMessageHeading2.textContent =
            `The ${this.name.textContent} car came first in ${Number(duration / 1000).toFixed(2)} sec`.toUpperCase();
          setTimeout(() => {
            winMessage.getHtml().style.display = 'none';
          }, 4000);
        }
      },
      duration - duration / 100,
    );

    const isBroken = await fetchDriveEngine(this.id);
    if (isBroken) {
      this.stopButton.removeAttribute('disabled');
      (this.carImage as SVGSVGElement).classList.add('car-img_animated-pause');
      clearTimeout(this.timerId);
    }
  }

  async stop() {
    clearTimeout(this.timerId);
    this.carBlockContainer.dataset.value = 'no-animated';
    const isStop = await fetchStopEngine(this.id);
    if (isStop) {
      this.carImage?.classList.remove('car-img_animated');
      this.carImage?.classList.remove('car-img_animated-pause');
      this.startButton.removeAttribute('disabled');
      this.stopButton.setAttribute('disabled', 'disabled');
    }
  }

  getHtml() {
    return this.carBlockContainer;
  }

  getRoad() {
    return this.roadContainer;
  }
}
