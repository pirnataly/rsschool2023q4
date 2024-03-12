import './styles.css';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  private headerView: Header | null;

  constructor() {
    this.headerView = null;
    this.createView();
  }

  createView(): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    document.body.append(wrapper);
    this.headerView = new Header();
    wrapper.append(this.headerView.getHtmlelement());
    const mainElement = new Main().getHtmlelement();
    wrapper.append(mainElement);
  }
}
