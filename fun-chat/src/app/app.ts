import './app.css';
import '../style.css';
import Form from './components/form/form';
import main from './components/main/main';

export default class App {
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.addClass('app');
    document.body.append(this.container);
    const form = new Form();
    this.container.append(form.getHtml());
    form.getHtml().onsubmit = (e) => {
      if (form.checkValidation(e)) {
        this.clear();
        this.container.append(main.getHtml());
      }
    };
  }

  clear() {
    this.container.innerHTML = '';
  }

  addClass(nameOfClass: string) {
    this.container.classList.add(nameOfClass);
  }

  getHtml() {
    return this.container;
  }
}
