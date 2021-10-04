import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Header from 'components/Header';
import Main from 'components/Main';

import { useStore } from 'stores';

import { getCardsFromLS, getLangFromLS, setLangToLS } from '../../services/localStorage';

import styles from './styles.module.scss';

const App = observer(() => {
  const { cardsStore, languageStore } = useStore();
  
  useEffect(() => {
    const currentLang = getLangFromLS();
    const currentCards = getCardsFromLS();

    if (currentCards.length) {
      cardsStore.updateCards(getCardsFromLS());
    }

    currentLang !== '' ? languageStore.changeLang(currentLang) : setLangToLS(languageStore.lang);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {cardsStore.cards.length === 0 ? <p>Please, input city name</p> : <Main />}
    </div>
  );
});

export default App;
