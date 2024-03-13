import './styles.css';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  private headerView: Header;

  private wrapper: HTMLDivElement | null;

  private mainElement: HTMLElement | null;

  constructor() {
    this.wrapper = null;
    this.mainElement = null;
    this.headerView = new Header();
    this.createView();
  }

  createView(): void {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';
    document.body.append(this.wrapper);
    this.wrapper.append(this.headerView.getHtmlelement());

    this.createMain(this.wrapper);
  }

  clearCreateMain() {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
    }
    this.createMain(this.wrapper!);
  }

  createMain(wrapper: HTMLDivElement) {
    const headerChild = this.headerView.getHtmlelement().children[0];
    this.mainElement = new Main(
      this.clearCreateMain.bind(this),
      headerChild as HTMLButtonElement,
    ).getHtmlelement();
    wrapper.append(this.mainElement);
  }
}
