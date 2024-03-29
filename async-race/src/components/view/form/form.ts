import './form-style.css';

import { classes, Limits } from '../../../interfaces';
import { fetchCreateCar, fetchGetCountOfCars, fetchUpdateCar } from '../../../services/service';
import Car from '../../car/car';
import store from '../../../utils/store';
import garage from '../garage/garage';

class Form {
  nameInput: HTMLInputElement;

  newNameInput: HTMLInputElement;

  colorInput: HTMLInputElement;

  newColorInput: HTMLInputElement;

  createButton: HTMLButtonElement;

  updateButton: HTMLButtonElement;

  formContainer: HTMLDivElement;

  raceButton: HTMLButtonElement;

  resetButton: HTMLButtonElement;

  generateButton: HTMLButtonElement;

  constructor() {
    this.formContainer = document.createElement('div');
    this.nameInput = document.createElement('input');
    this.nameInput.placeholder = 'Enter car name';
    this.colorInput = document.createElement('input');
    this.createButton = document.createElement('button');
    this.newNameInput = document.createElement('input');
    store.subscribe(() => {
      this.newNameInput.removeAttribute('disabled');
      this.newNameInput.value = store.activeCarName;
      this.newColorInput.removeAttribute('disabled');
      this.newColorInput.value = store.activeCarColor;
      this.updateButton.removeAttribute('disabled');
    });
    this.newColorInput = document.createElement('input');
    this.updateButton = document.createElement('button');
    this.raceButton = document.createElement('button');
    this.resetButton = document.createElement('button');
    this.generateButton = document.createElement('button');
    this.render();
    this.addEventListeners();
  }

  render() {
    const components = [
      this.formContainer,
      this.nameInput,
      this.colorInput,
      this.createButton,
      this.newNameInput,
      this.newColorInput,
      this.updateButton,
      this.raceButton,
      this.resetButton,
      this.generateButton,
    ];

    const typeAttributes = [
      '',
      'text',
      'color',
      'button',
      'text',
      'color',
      'button',
      'button',
      'button',
      'button',
    ];
    components.forEach((elem: HTMLElement, index: number) => {
      const el = elem;
      el.className = classes[index];
      if (index === 3 || index === 6) el.textContent = classes[index].slice(0, 6).toUpperCase();
      if (index > 0) el.setAttribute('type', `${typeAttributes[index]}`);
      if (index > 3 && index <= 6) el.setAttribute('disabled', 'disabled');
    });
    this.resetButton.setAttribute('disabled', 'disabled');
    this.raceButton.textContent = 'race'.toUpperCase();
    this.resetButton.textContent = 'reset'.toUpperCase();
    this.generateButton.textContent = 'generate cars'.toUpperCase();
    this.formContainer.append(
      this.nameInput,
      this.colorInput,
      this.createButton,
      document.createElement('div'),
      this.newNameInput,
      this.newColorInput,
      this.updateButton,
      document.createElement('div'),
      this.raceButton,
      this.resetButton,
      this.generateButton,
    );
  }

  getForm() {
    return this.formContainer;
  }

  addEventListeners() {
    this.createButton.addEventListener('click', () => {
      this.createCar();
    });

    this.updateButton.addEventListener('click', () => {
      fetchUpdateCar(store.activeCarId, this.newNameInput.value, this.newColorInput.value);
      garage.clear();
      garage.render();
      this.newNameInput.value = '';
      this.newColorInput.value = '#10100F';
      this.newColorInput.setAttribute('disabled', 'disabled');
      this.newNameInput.setAttribute('disabled', 'disabled');
      this.updateButton.setAttribute('disabled', 'disabled');
    });

    this.raceButton.addEventListener('click', () => {
      garage.race();
      this.resetButton.removeAttribute('disabled');
    });

    this.resetButton.addEventListener('click', () => {
      garage.stopRace();
      if (!garage.prevButton.isDisabled) {
        garage.prevButton.getHtml().removeAttribute('disabled');
      }
      if (!garage.nextButton.isDisabled) {
        garage.nextButton.getHtml().removeAttribute('disabled');
      }
      this.resetButton.setAttribute('disabled', 'disabled');
    });
  }

  private async createCar() {
    this.nameInput.value = this.nameInput.value.length === 0 ? 'anonymous' : this.nameInput.value;
    const carObj = await fetchCreateCar(this.nameInput.value, this.colorInput.value);
    const countOfCars = Number(await fetchGetCountOfCars());
    garage.heading.textContent = `Garage (${countOfCars})`;
    const newcar = new Car(carObj.name, carObj.color, carObj.id);
    garage.currentCarsArray.push(newcar);
    if (garage.getHtml().children.length < Limits.garageChildren) {
      garage.appendCar(newcar);
      garage.getHtml().append(garage.prevButton.getHtml(), garage.nextButton.getHtml());
    }
    if (countOfCars <= garage.numberOfPage * Limits.page) {
      garage.nextButton.getHtml().setAttribute('disabled', 'disabled');
    } else {
      garage.nextButton.getHtml().removeAttribute('disabled');
    }
    this.nameInput.value = '';
  }
}

const form = new Form().getForm();
export default form;
