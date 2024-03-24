class MainPage {
  mainContainer: HTMLElement;

  constructor() {
    this.mainContainer = document.createElement('div');
    this.pasteForm();
  }

  pasteForm() {
    const form = document.createElement('div');
    form.className = 'form';
    this.mainContainer.append(form);
  }

  getHtmlElement() {
    return this.mainContainer;
  }
}

const mainPage = new MainPage().getHtmlElement();
export default mainPage;
