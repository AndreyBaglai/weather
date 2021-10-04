import { action, makeObservable, observable } from 'mobx';

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable lang: string = 'en';

  @action
  changeLang = (newLang: string) => {
    this.lang = newLang;
  };
}

export default new Store();
