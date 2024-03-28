import './form-style.css';
import garage from '../garage/garage';
import { Limits } from '../../../interfaces';
import { fetchCreateCar, fetchGetCountOfCars, fetchUpdateCar } from '../../../services/service';
import Car from '../../car/car';
import store from '../../../utils/store';

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
    store.subscribe(() => {
      this.newNameInput.removeAttribute('disabled');
      this.newNameInput.value = store.activeCarName;
      this.newColorInput.removeAttribute('disabled');
      this.newColorInput.value = store.activeCarColor;
      this.updateButton.removeAttribute('disabled');
    });
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

    this.updateButton.addEventListener('click', () => {
      fetchUpdateCar(store.activeCarId, this.newNameInput.value, this.newColorInput.value);
      garage.clear();
      garage.render();
      this.newNameInput.value = '';
      this.newColorInput.value = '';
      this.newColorInput.setAttribute('disabled', 'disabled');
      this.newNameInput.setAttribute('disabled', 'disabled');
      this.updateButton.setAttribute('disabled', 'disabled');
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
