import './styles.css';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  private headerView: Header | null;

  private wrapper: HTMLDivElement | null;

  private mainElement: HTMLElement | null;

  constructor() {
    this.headerView = null;
    this.wrapper = null;
    this.mainElement = null;
    this.createView();
  }

  createView(): void {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';
    document.body.append(this.wrapper);
    this.headerView = new Header();
    this.wrapper.append(this.headerView.getHtmlelement());
    this.mainElement = new Main(this.toLogin.bind(this)).getHtmlelement();
    this.wrapper.append(this.mainElement);
  }

  toLogin() {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
    }
  }
}
