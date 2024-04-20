import { ObserverInterface, User } from '../app/interfaces';

export class CurrentUser {
  observers = new Array<ObserverInterface>();

  user: User = {
    login: '',

    password: '',

    isLogined: false,

    error: '',

    activeUsers: [],

    inactiveUsers: [],
  };

  subscribe(observer: ObserverInterface) {
    this.observers.push(observer);
  }

  notify(id: string) {
    this.observers.forEach((observer) => observer.update(this.user, id));
  }
}

const curUser = new CurrentUser();
export default curUser;
