import React from 'react';
import Form from '../Form/Form';
import SelectLanguage from '../SelectLanguage/SelectLanguage';
import cardsStore from '../../store/cards';

import './Header.scss';
import { removeAllCardsFromLS } from '../../services/localStorage';

export default function Header() {
  const onRemoveAllCards = () => {
    cardsStore.removeAllCards();
    removeAllCardsFromLS();
  }
  
  return (
    <header className="header">
      <Form />
      <button className="remove-all" onClick={onRemoveAllCards}>Remove all</button>
      <SelectLanguage />
    </header>
  );
}
