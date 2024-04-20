import './about.css';
import { prevButtonProperties, typicalButtonAttributes } from '../../interfaces';
import { createButton } from '../../../utils/elements-creators';
import curUser from '../../../utils/current-user';
import GithubLink from '../github-link';

class AboutPage {
  private aboutContainer: HTMLElement;

  constructor() {
    this.aboutContainer = document.createElement('article');
    this.aboutContainer.className = 'about';
    const h3 = document.createElement('h3');
    h3.className = 'about-heading';
    h3.textContent = 'Fun chat';
    const p = document.createElement('p');
    const text =
      'Application designed for Fun Chat work assignments as part of the RSSchool JS/FE course Q3 2023.';
    const a = new GithubLink('Author: pirnataly').getHtml();
    p.textContent = text;
    const prevButton = createButton(typicalButtonAttributes, prevButtonProperties);
    prevButton.addEventListener('click', () => {
      curUser.notify();
    });
    this.aboutContainer.append(h3, p, a, prevButton);
  }

  getHtml() {
    return this.aboutContainer;
  }
}

const aboutPage = new AboutPage();
export default aboutPage;
