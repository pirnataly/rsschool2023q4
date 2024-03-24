import AppContainer from './appcontainer';
import mainPage from './pages/main';

export default class App {
  appContainer: AppContainer;

  constructor() {
    this.appContainer = new AppContainer(mainPage);
    this.getHtmElement();
  }

  getHtmElement() {
    return this.appContainer;
  }
}
