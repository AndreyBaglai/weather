import { createContext, useContext } from 'react';
import { observable } from 'mobx';

import languageStore from './Language';
import cardsStore from './Cards';
import loaderStore from './Loader';

class RootStore {
  @observable languageStore = languageStore;
  @observable cardsStore = cardsStore;
  @observable loaderStore = loaderStore;
}

const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

export default new RootStore();