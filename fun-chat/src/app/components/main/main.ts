import './main.css';

class Main {
  mainContainer: HTMLElement;

  constructor() {
    this.mainContainer = document.createElement('main');
    this.mainContainer.className = 'main';
    this.mainContainer.textContent = 'This will be the main';
  }

  getHtml() {
    return this.mainContainer;
  }
}

const main = new Main();

export default main;
