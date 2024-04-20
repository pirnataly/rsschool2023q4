import './footer.css';
import getSvg, { createElement } from '../../../../utils/elements-creators';
import GithubLink from '../../github-link';

export default class Footer {
  footerContainer: HTMLElement | HTMLDivElement;

  constructor() {
    this.footerContainer = createElement('footer-container', 'div');
    const logoSchool = createElement('footer__element footer_logo', 'a');
    logoSchool.textContent = ' RSSchool';
    (logoSchool as HTMLLinkElement).href = 'https://app.rs.school/';
    getSvg(logoSchool);
    const githubLink = new GithubLink('Github').getHtml();
    githubLink.className = 'footer__element footer_github';
    const yearOfCreation = createElement('footer__element year', 'p');
    yearOfCreation.textContent = '2024';
    this.footerContainer.append(logoSchool, githubLink, yearOfCreation);
  }

  getHtml() {
    return this.footerContainer;
  }
}
