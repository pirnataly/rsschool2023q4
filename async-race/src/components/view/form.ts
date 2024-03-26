import './form-style.css';
import { fetchCreateCar, fetchGetCountOfCars } from '../../services/service';
import garage from './garage';
import { Limits } from '../../interfaces';
import Car from '../car/car';

class Form {
  nameInput: HTMLInputElement;

  newNameInput: HTMLInputElement;

  currentCar: null | number;

  colorInput: HTMLInputElement;

  newColorInput: HTMLInputElement;

  createButton: HTMLButtonElement;

  updateButton: HTMLButtonElement;

  formContainer: HTMLDivElement;

  constructor() {
    this.formContainer = document.createElement('div');
    this.nameInput = document.createElement('input');
    this.colorInput = document.createElement('input');
    this.createButton = document.createElement('button');
    this.newNameInput = document.createElement('input');
    this.newColorInput = document.createElement('input');
    this.updateButton = document.createElement('button');
    this.currentCar = null;
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
    ];
    const classes = [
      'form-container',
      'name-input',
      'color-input',
      'create-button',
      'new-name-input',
      'new-color-input',
      'update-button',
    ];
    const typeAttributes = ['', 'text', 'color', 'button', 'text', 'color', 'button'];
    components.forEach((elem: HTMLElement, index: number) => {
      const el = elem;
      el.className = classes[index];
      if (index === 3 || index === 6) el.textContent = classes[index].slice(0, 6).toUpperCase();
      if (index > 0) el.setAttribute('type', `${typeAttributes[index]}`);
      if (index > 3) el.setAttribute('disabled', 'disabled');
    });
    this.formContainer.append(
      this.nameInput,
      this.colorInput,
      this.createButton,
      document.createElement('div'),
      this.newNameInput,
      this.newColorInput,
      this.updateButton,
    );
  }

  getForm() {
    return this.formContainer;
  }

  addEventListeners() {
    this.createButton.addEventListener('click', () => {
      this.createCar();
    });
  }

  private async createCar() {
    const carObj = await fetchCreateCar(this.nameInput.value, this.colorInput.value);
    const countOfCars = Number(await fetchGetCountOfCars());
    garage.heading.textContent = `Garage (${countOfCars})`;
    const newcar = new Car(carObj.name, carObj.color, carObj.id);
    if (carObj && carObj.id <= garage.numberOfPage * Limits.page) {
      garage.appendCar(newcar);
      garage.getHtml().append(garage.prevButton, garage.nextButton);
    }
    if (countOfCars <= garage.numberOfPage * Limits.page) {
      garage.nextButton.setAttribute('disabled', 'disabled');
    } else {
      garage.nextButton.removeAttribute('disabled');
    }
  }
}

const form = new Form().getForm();
export default form;
