import './winners-style.css';

export default class Winners {
  winnersContainer: HTMLDivElement;

  constructor() {
    this.winnersContainer = document.createElement('div');
    this.winnersContainer.className = 'winners-container';
  }

  getHtml() {
    return this.winnersContainer;
  }
}
