import './start-page.css';
import View from '../../view';
import { CssClasses } from '../../../../interfaces/types';

export default class StartPage extends View {
  private page: HTMLElement | null;

  private appMethod: () => void;

  constructor(appMethod: () => void) {
    const startPageParameters = {
      tag: 'div',
      classNames: [CssClasses.startPage],
    };
    super(startPageParameters);
    this.appMethod = appMethod;
    this.page = null;

    this.createPageBlocks();
  }

  createPageBlocks(): void {
    this.page = this.getHtmlelement();
  }
}
