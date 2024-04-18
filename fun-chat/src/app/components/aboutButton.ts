import { aboutButtonAttributes, aboutButtonProperties } from '../interfaces';
import { createButton } from '../../utils/create-form-elements';
import aboutPage from './about/about';
import curParent from '../../utils/current-user';

const aboutButton = createButton(aboutButtonAttributes, aboutButtonProperties);
aboutButton.addEventListener('click', () => {
  window.history.pushState(null, `${window.location.href}about`);
  window.history.forward();
  const parent = aboutButton.parentElement?.parentElement;
  if (parent) {
    parent.innerHTML = '';
    parent.append(aboutPage.getHtml());
    curParent.current = aboutButton.parentElement;
  }
});

export default aboutButton;
