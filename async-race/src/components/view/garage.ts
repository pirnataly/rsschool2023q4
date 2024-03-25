import Car from '../car/car';
import { fetchGetArrayOfCars, fetchGetCountOfCars } from '../../services/service';

class Garage {
  heading: HTMLHeadingElement;

  pageHeading: HTMLHeadingElement;

  prevButton: HTMLButtonElement;

  nextButton: HTMLButtonElement;

  garageContainer: HTMLDivElement;

  numberOfPage: number;

  constructor() {
    this.garageContainer = document.createElement('div');
    this.heading = document.createElement('h1');
    this.pageHeading = document.createElement('h2');
    this.numberOfPage = 3;
    this.prevButton = document.createElement('button');
    this.nextButton = document.createElement('button');
    this.render();
    this.setEventListeners();
  }

  async render() {
    this.setPageHeading();
    this.prevButton.textContent = 'prev'.toUpperCase();
    this.nextButton.textContent = 'next'.toUpperCase();
    const countOfCars = Number(await fetchGetCountOfCars());
    const obj = await fetchGetArrayOfCars(this.numberOfPage);
    this.heading.textContent = `Garage (${countOfCars})`;
    this.garageContainer.append(this.heading, this.pageHeading);
    for (let i = 0; i < obj.length; i += 1) {
      const car = new Car(obj[i].name, obj[i].color);
      this.appendCar(car);
      car.startButton.addEventListener('click', () => {
        car.carImage?.classList.add('car-img_animated');
      });
    }
    this.getHtml().append(this.prevButton, this.nextButton);
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
    this.nextButton.addEventListener('click', () => {
      this.numberOfPage += 1;
      this.clear();
      this.render();
    });
    this.prevButton.addEventListener('click', () => {
      this.numberOfPage -= 1;
      this.clear();
      this.render();
    });
  }
}

const garage = new Garage();
export default garage;
