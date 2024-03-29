import { fetchGetArrayOfCars, fetchGetCountOfCars } from '../../../services/service';
import '../../car/car-styles.css';
import Car from '../../car/car';
import { Limits } from '../../../interfaces';
import Button from './buttons';
import winMessage from '../../../utils/message';

class Garage {
  heading: HTMLHeadingElement;

  pageHeading: HTMLHeadingElement;

  garageContainer: HTMLDivElement;

  numberOfPage: number;

  currentCarsArray: Car[];

  prevButton: Button;

  nextButton: Button;

  winMessage: HTMLDivElement;

  constructor() {
    this.garageContainer = document.createElement('div');
    this.heading = document.createElement('h1');
    this.pageHeading = document.createElement('h2');
    this.numberOfPage = 1;
    this.prevButton = new Button('prev');
    this.nextButton = new Button('next');
    this.currentCarsArray = [];
    this.winMessage = winMessage.getHtml();
    this.render();
    this.setEventListeners();
  }

  async render() {
    this.currentCarsArray.length = 0;
    this.setPageHeading();
    this.prevButton.getHtml().style.marginRight = '10px';
    const countOfCars = Number(await fetchGetCountOfCars());
    this.heading.textContent = `Garage (${countOfCars})`;
    const obj = await fetchGetArrayOfCars(this.numberOfPage);
    this.heading.textContent = `Garage (${countOfCars})`;
    this.garageContainer.append(this.heading, this.pageHeading, this.winMessage);
    for (let i = 0; i < obj.length; i += 1) {
      const car = new Car(obj[i].name, obj[i].color, obj[i].id);
      this.currentCarsArray.push(car);
      this.appendCar(car);
    }

    this.getHtml().append(this.prevButton.getHtml(), this.nextButton.getHtml());
    if (countOfCars <= this.numberOfPage * Limits.page) {
      this.nextButton.getHtml().setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.getHtml().removeAttribute('disabled');
    }
    if (this.numberOfPage === 1) {
      this.prevButton.getHtml().setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.getHtml().removeAttribute('disabled');
    }
  }

  clear() {
    this.garageContainer.innerHTML = '';
  }

  appendCar(car: Car) {
    this.garageContainer.append(car.getHtml());
  }

  getHtml() {
    return this.garageContainer;
  }

  setPageHeading() {
    this.pageHeading.textContent = `Page #${this.numberOfPage}`;
  }

  setEventListeners() {
    this.nextButton.getHtml().addEventListener('click', () => {
      this.numberOfPage += 1;
      this.clear();
      this.render();
    });
    this.prevButton.getHtml().addEventListener('click', () => {
      this.numberOfPage -= 1;
      this.clear();
      this.render();
    });
    this.garageContainer.addEventListener('click', (ev: MouseEvent) => {
      const { target } = ev;
      if ((target as HTMLElement).classList.contains('remove-button')) {
        this.clear();
        this.render();
      }
    });
  }

  race() {
    Car.raceWinner.length = 0;
    this.prevButton.isDisabled = this.prevButton.getHtml().hasAttribute('disabled');
    this.nextButton.isDisabled = this.nextButton.getHtml().hasAttribute('disabled');
    if (!this.prevButton.isDisabled) {
      this.prevButton.getHtml().setAttribute('disabled', 'disabled');
    }
    if (!this.nextButton.isDisabled) {
      this.nextButton.getHtml().setAttribute('disabled', 'disabled');
    }
    this.currentCarsArray.forEach((car) => {
      if (!(car.getHtml().dataset.value === 'animated')) {
        car.start();
      }
    });
  }

  stopRace() {
    this.currentCarsArray.forEach((car) => {
      car.stop();
    });
  }
}

const garage = new Garage();
export default garage;
