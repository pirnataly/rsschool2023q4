import './about.css';
import { createButton } from '../../../utils/create-form-elements';
import { aboutButtonAttributes, prevbuttonProperties } from '../../interfaces';
import curParent from '../../../utils/current-user';

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
    const a = document.createElement('a');
    a.textContent = 'Author: pirnataly';
    a.href = 'https://github.com/pirnataly';
    p.textContent = text;
    const prevButton = createButton(aboutButtonAttributes, prevbuttonProperties);
    prevButton.addEventListener('click', () => {
      const parent = this.aboutContainer.parentElement;
      if (parent) {
        parent.innerHTML = '';
        if (curParent) {
          parent.append(curParent.current as Node);
        }
      }
    });
    this.aboutContainer.append(h3, p, a, prevButton);
  }

  getHtml() {
    return this.aboutContainer;
  }
}

const aboutPage = new AboutPage();
export default aboutPage;
