import { Parameters } from '../../interfaces/types';
import ElementCreator from '../utils/element-creator';

export default class View {
  private elementView: ElementCreator;

  private elementCreator: ElementCreator | null;

  constructor(args: Parameters) {
    this.elementCreator = null;
    this.elementView = this.createView(args);
  }

  createView(args: Parameters) {
    const elementParams = {
      tag: args.tag,
      classNames: args.classNames,
      textContent: args.textContent,
      callback: args.callback,
      types: args.types,
    };
    this.elementCreator = new ElementCreator(elementParams);
    return this.elementCreator;
  }

  getHtmlelement(): HTMLElement {
    return this.elementView.getElement();
  }
}
