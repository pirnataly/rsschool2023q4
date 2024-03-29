class Message {
  message: HTMLDivElement;

  winMessageHeading: HTMLHeadingElement;

  winMessageHeading2: HTMLHeadingElement;

  constructor() {
    this.message = document.createElement('div');
    this.getHtml().className = 'win-message';
    this.winMessageHeading = document.createElement('h1');
    this.winMessageHeading.textContent = 'Winner!';
    this.winMessageHeading2 = document.createElement('h2');
    this.getHtml().append(this.winMessageHeading, this.winMessageHeading2);
    this.getHtml().style.display = 'none';
  }

  getHtml() {
    return this.message;
  }
}

const winMessage = new Message();

export default winMessage;
