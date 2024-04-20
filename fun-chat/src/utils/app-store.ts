class Store {
  callback!: () => void;

  parent: HTMLElement | null = null;

  subscribe(callback: () => void) {
    this.callback = callback;
  }

  emit() {
    this.callback();
  }
}

const appStore = new Store();
export default appStore;
