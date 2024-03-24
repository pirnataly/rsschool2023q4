import form from '../../components/view/form';

class MainPage {
  mainContainer: HTMLElement;

  constructor() {
    this.mainContainer = document.createElement('div');
    this.pasteForm();
  }

  pasteForm() {
    this.mainContainer.append(form);
  }

  getHtmlElement() {
    return this.mainContainer;
  }
}

const mainPage = new MainPage().getHtmlElement();
export default mainPage;
