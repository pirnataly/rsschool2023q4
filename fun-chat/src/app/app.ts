import './app.css';
import '../style.css';
// import socket from "../services/socket";
import form from './components/form/form';

export default class App {
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.addClass('app');
    document.body.append(this.container);
    this.container.append(form.getHtml());
  }

  addClass(nameOfClass: string) {
    this.container.classList.add(nameOfClass);
  }

  getHtml() {
    return this.container;
  }
}
