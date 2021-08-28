import { makeAutoObservable } from 'mobx';

class Loader {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getStatus() {
    return this.isLoading;
  }
  
  toggleLoader = () => this.isLoading = !this.isLoading;
}

export default new Loader();
