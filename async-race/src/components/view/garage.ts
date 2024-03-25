import Car from '../car/car';
import { fetchGetArrayOfCars, fetchGetCountOfCars } from '../../services/service';
import { Limits } from '../../interfaces';

class Garage {
  private heading: HTMLHeadingElement;

  private pageHeading: HTMLHeadingElement;

  private prevButton: HTMLButtonElement;

  private nextButton: HTMLButtonElement;

  private garageContainer: HTMLDivElement;

  private numberOfPage: number;

  constructor() {
    this.garageContainer = document.createElement('div');
    this.heading = document.createElement('h1');
    this.pageHeading = document.createElement('h2');
    this.numberOfPage = 1;
    this.pageHeading.textContent = `Page #${this.numberOfPage}`;
    this.prevButton = document.createElement('button');
    this.nextButton = document.createElement('button');
    this.render();
  }

  async render() {
    const countOfCars = Number(await fetchGetCountOfCars());
    const obj = await fetchGetArrayOfCars(this.numberOfPage);
    this.heading.textContent = `Garage (${countOfCars})`;
    this.garageContainer.append(this.heading, this.pageHeading);
    for (let i = 0; i < Limits.page; i += 1) {
      const car = new Car(obj[i].name, obj[i].color);
      this.garageContainer.append(car.getHtml());
      car.startButton.addEventListener('click', () => {
        car.carImage?.classList.add('car-img_animated');
      });
    }
  }

  getHtml() {
    return this.garageContainer;
  }
}

const garage = new Garage().getHtml();
export default garage;
