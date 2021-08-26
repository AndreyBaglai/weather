import { makeAutoObservable } from 'mobx';

class Language {
  lang = 'en';

  constructor() {
    makeAutoObservable(this);
  }

  changeLang = (newLang: string) => {
    this.lang = newLang;
  };
}

export default new Language();
