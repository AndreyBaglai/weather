import { action, makeObservable, observable } from 'mobx';

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable isLoading = false;
  
  @action
  toggleLoader = () => this.isLoading = !this.isLoading;
}

export default new Store();
