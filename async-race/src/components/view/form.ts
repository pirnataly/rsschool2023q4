import './form-style.css';
import fetchCreateCar from '../../services/service';
import getCar from './car-image';

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
    if (carObj) {
      getCar(this.getForm(), carObj.color);
    }
  }
}

const form = new Form().getForm();
export default form;
