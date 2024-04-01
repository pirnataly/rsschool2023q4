import './winners-style.css';
import Button from '../garage/buttons';
import {
  createWinnerRow,
  fetchGetArrayOfWinners,
  fetchGetCountOfWinners,
} from '../../../services/service';
import { Limits, Params, ResultRow, Winner } from '../../../interfaces';
import { getIconCar } from '../car-image';

export default class Winners {
  winnersContainer: HTMLDivElement;

  heading: HTMLHeadingElement;

  pageHeading: HTMLHeadingElement;

  numberOfPage: number;

  prevButton: Button;

  nextButton: Button;

  winnersResultBlock: HTMLDivElement;

  columnNamesContainer: HTMLDivElement;

  resultsBlock: HTMLDivElement;

  constructor() {
    this.winnersContainer = document.createElement('div');
    this.winnersContainer.className = 'winners-container';
    this.heading = document.createElement('h1');
    this.heading.textContent = `Winners ...`;
    this.pageHeading = document.createElement('h2');
    this.numberOfPage = 1;
    this.pageHeading.textContent = `Page #${this.numberOfPage}`;
    this.prevButton = new Button('prev');
    this.nextButton = new Button('next');
    this.prevButton.getHtml().setAttribute('disabled', 'disabled');
    this.winnersResultBlock = document.createElement('div');
    this.columnNamesContainer = document.createElement('div');
    this.columnNamesContainer.className = 'column-names-container';
    const columnsNames = ['№', 'Car', 'Name', 'Wins', 'BestTime (sec)'];
    for (let i = 0; i < columnsNames.length; i += 1) {
      const columnHeading = document.createElement('h2');
      columnHeading.className = 'column-heading';
      columnHeading.textContent = columnsNames[i];
      if (i === 3) {
        columnHeading.classList.add('wins-column');
      }
      if (i === 4) {
        columnHeading.classList.add('time-column');
      }

      this.columnNamesContainer.append(columnHeading);
    }
    this.winnersResultBlock.append(this.columnNamesContainer);
    this.winnersResultBlock.className = 'winners-result-block';
    this.resultsBlock = document.createElement('div');
    this.winnersContainer.append(
      this.heading,
      this.pageHeading,
      this.winnersResultBlock,
      this.prevButton.getHtml(),
      this.nextButton.getHtml(),
    );
    this.addEventListeners();
  }

  async render(param: Params) {
    this.clear();
    const array = (await fetchGetArrayOfWinners(param)) as Winner[];
    const countOfWinners = Number(await fetchGetCountOfWinners());
    this.updateHeading(countOfWinners);
    this.pageHeading.textContent = `Page #${this.numberOfPage}`;
    if (countOfWinners <= this.numberOfPage * Limits.pageWinners) {
      this.nextButton.getHtml().setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.getHtml().removeAttribute('disabled');
    }
    if (this.numberOfPage === 1) {
      this.prevButton.getHtml().setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.getHtml().removeAttribute('disabled');
    }

    const resultsBlockArray: ResultRow = [];
    await createWinnerRow(array, resultsBlockArray);
    resultsBlockArray.forEach((result, index: number) => {
      const row = document.createElement('div');
      row.className = 'row';
      for (let i = 0; i < Limits.columns; i += 1) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i !== 1) {
          let text;
          if (i === 0) {
            text = index + 1;
          }
          if (i === 2) {
            text = result.name;
          }
          if (i === 3) {
            text = result.wins;
          }
          if (i === 4) {
            text = result.time;
          }
          cell.textContent = String(text);
        } else getIconCar(cell, result.color);
        row.append(cell);
      }
      this.resultsBlock.append(row);
    });

    this.winnersResultBlock.append(this.resultsBlock);
  }

  addEventListeners() {
    this.nextButton.getHtml().addEventListener('click', () => {
      this.numberOfPage += 1;
      this.prevButton.getHtml().removeAttribute('disabled');
      this.render({ page: this.numberOfPage, limit: Limits.pageWinners });
    });
    this.prevButton.getHtml().addEventListener('click', () => {
      this.numberOfPage -= 1;
      this.render({ page: this.numberOfPage, limit: Limits.pageWinners });
      if (this.numberOfPage === 1) {
        this.prevButton.getHtml().setAttribute('disabled', 'disabled');
      }
    });
    const winsTitle = this.columnNamesContainer.children[3];
    winsTitle.addEventListener('click', () => {
      winsTitle.classList.toggle('asc');
      winsTitle.textContent = winsTitle.classList.contains('asc') ? 'Wins ↓' : 'Wins ↑';
      const par = winsTitle.classList.contains('asc')
        ? { page: this.numberOfPage, limit: 10, sort: 'wins', order: 'ASC' }
        : { page: this.numberOfPage, limit: 10, sort: 'wins', order: 'DESC' };
      this.render(par);
    });

    const timeTitle = this.columnNamesContainer.children[4];
    timeTitle.addEventListener('click', () => {
      timeTitle.classList.toggle('asc');
      timeTitle.textContent = timeTitle.classList.contains('asc')
        ? 'BestTime (sec) ↓'
        : 'BestTime (sec) ↑';
      const par = timeTitle.classList.contains('asc')
        ? { page: this.numberOfPage, limit: 10, sort: 'time', order: 'ASC' }
        : { page: this.numberOfPage, limit: 10, sort: 'time', order: 'DESC' };
      this.render(par);
    });
  }

  updateHeading(winnersCount: number) {
    this.heading.textContent = `Winners (${winnersCount})`;
  }

  clear() {
    this.resultsBlock.innerHTML = '';
  }

  getHtml() {
    return this.winnersContainer;
  }
}
