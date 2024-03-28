import form from '../../components/view/form/form';
import garage from '../../components/view/garage/garage';

class MainPage {
  mainContainer: HTMLElement;

  constructor() {
    this.mainContainer = document.createElement('div');
    this.pasteForm();
    this.pasteGarage();
  }

  pasteForm() {
    this.mainContainer.append(form);
  }

  pasteGarage() {
    this.mainContainer.append(garage.getHtml());
  }

  getHtmlElement() {
    return this.mainContainer;
  }
}

const mainPage = new MainPage().getHtmlElement();
export default mainPage;
