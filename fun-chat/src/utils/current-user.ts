class CurrentParent {
  current: null | HTMLElement;

  constructor() {
    this.current = null;
  }

  getHtml() {
    return this.current;
  }
}

const curParent = new CurrentParent();
export default curParent;
