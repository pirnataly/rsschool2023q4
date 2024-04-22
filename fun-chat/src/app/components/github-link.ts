export default class GithubLink {
  private link: HTMLAnchorElement;

  constructor(text: string) {
    this.link = document.createElement('a');
    this.link.className = 'github-link';
    this.link.textContent = text;
    this.link.href = 'https://github.com/pirnataly';
  }

  getHtml() {
    return this.link;
  }
}
