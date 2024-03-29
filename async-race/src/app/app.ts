import AppContainer from './appcontainer';
import mainPage from './pages/main';
import winners from './pages/winners';

export default class App {
  appContainer: AppContainer;

  currentPage: HTMLElement;

  garageButton: HTMLButtonElement;

  winnersButton: HTMLButtonElement;

  constructor() {
    this.garageButton = document.createElement('button');
    this.garageButton.textContent = 'TO GARAGE';
    this.winnersButton = document.createElement('button');
    this.winnersButton.textContent = 'TO WINNERS';
    document.body.append(this.garageButton, this.winnersButton);
    this.currentPage = mainPage;
    if (this.currentPage === mainPage) {
      winners.style.visibility = 'hidden';
    } else {
      mainPage.style.visibility = 'hidden';
    }
    this.appContainer = new AppContainer(mainPage, winners);
    document.body.append(this.appContainer.getHtml());
    this.addListeners();
  }

  addListeners() {
    this.winnersButton.addEventListener('click', () => {
      this.currentPage = winners;
      mainPage.style.visibility = 'hidden';
      winners.style.visibility = 'visible';
    });
    this.garageButton.addEventListener('click', () => {
      this.currentPage = mainPage;
      winners.style.visibility = 'hidden';
      this.currentPage.style.visibility = 'visible';
    });
  }
}
