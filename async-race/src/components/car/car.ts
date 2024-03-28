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

  id: number;

  constructor(name: string, color: string, id: number) {
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
      this.carImage?.classList.add('car-img_animated');
      this.startButton.setAttribute('disabled', 'disabled');
      (this.carImage as SVGSVGElement).style.animationDuration = `${Math.trunc(duration)}ms`;
      await this.drive(duration);
    }
  }

  async drive(duration: number) {
    setTimeout(
      () => {
        (this.carImage as SVGSVGElement).classList.add('car-img_animated-pause');
        this.stopButton.removeAttribute('disabled');
      },
      duration - duration / 100,
    );
    const isBroken = await fetchDriveEngine(this.id);
    if (isBroken) {
      this.stopButton.removeAttribute('disabled');
      (this.carImage as SVGSVGElement).classList.add('car-img_animated-pause');
    }
  }

  async stop() {
    const isStop = await fetchStopEngine(this.id);
    if (isStop) {
      this.carImage?.classList.remove('car-img_animated', 'car-img_animated-pause');
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
