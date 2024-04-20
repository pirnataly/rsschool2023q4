import { ObserverInterface, User } from '../app/interfaces';

export class CurrentUser {
  observers = new Array<ObserverInterface>();

  user: User = {
    login: '',

    password: '',

    isLogined: false,

    error: '',
  };

  subscribe(observer: ObserverInterface) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this.user));
  }
}

const curUser = new CurrentUser();
export default curUser;
