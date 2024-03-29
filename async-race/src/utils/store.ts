class Store {
  callback!: () => void;

  activeCarId: number = 0;

  activeCarColor: string = '#10100F';

  activeCarName: string = 'Noname';

  subscribe(callback: () => void) {
    this.callback = callback;
  }

  emit() {
    this.callback();
  }
}

const store = new Store();
export default store;
