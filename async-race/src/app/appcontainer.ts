export default class AppContainer {
  constructor(page: HTMLElement) {
    AppContainer.appendPage(page);
  }

  static appendPage(page: HTMLElement) {
    document.body.append(page);
  }
}
