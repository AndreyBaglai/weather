import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { getCardsFromLS, getLangFromLS, setLangToLS } from './services/localStorage';

import languageStore from './store/language';
import cardsStore from './store/cards';

import './App.scss';

const App = observer(() => {
  useEffect(() => {
    const currentLang = getLangFromLS();
    const currentCards = getCardsFromLS();

    if (currentCards.length) {
      cardsStore.updateCards(getCardsFromLS());
    }

    currentLang !== '' ? languageStore.changeLang(currentLang) : setLangToLS(languageStore.lang);
  }, []);

  return (
    <div className="container">
      <Header />
      {cardsStore.totalCards.length === 0 ? <p>Please, input city name</p> : <Main />}
    </div>
  );
});

export default App;
