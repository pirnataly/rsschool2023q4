import { AttributeType, Parameters } from '../../interfaces/types';

export default class ElementCreator {
  public element: HTMLElement | null;

  constructor(args: Parameters) {
    this.element = null;
    this.createElement(args);
  }

  createElement(args: Parameters): void {
    this.element = document.createElement(args.tag);
    this.setCssClasses(args.classNames);
    this.setCallback(args.callback);
    this.setTextContent(args.textContent);
    this.setType(args.types);
  }

  setCssClasses(cssClasses: string[]): void {
    cssClasses.forEach((className) => {
      this.element!.classList.add(className);
    });
  }

  setCallback(callback: ((e: Event) => void) | undefined) {
    if (callback !== undefined) {
      this.element!.onclick = (event: MouseEvent) => callback(event);
    }
  }

  setTextContent(text: string | undefined): void {
    if (typeof text === 'string') {
      this.element!.textContent = text;
    }
  }

  setType(typesAttr: AttributeType[] | undefined): void {
    if (typesAttr?.length) {
      typesAttr?.forEach((typeAttr) => {
        const [type, value] = typeAttr;
        this.element!.setAttribute(type, value);
      });
    }
  }

  getElement(): HTMLElement {
    return this.element!;
  }
}
