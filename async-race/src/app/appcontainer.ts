import './app.css';

export default class AppContainer {
  container: HTMLDivElement;

  constructor(page1: HTMLElement, page2: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'app-container';
    this.appendPage(page1, page2);
  }

  appendPage(page1: HTMLElement, page2: HTMLElement) {
    this.container.append(page1, page2);
  }

  getHtml() {
    return this.container;
  }
}
