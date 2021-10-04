import React from 'react';

import Form from '../Form';
import SelectLanguage from '../SelectLanguage';
import cardsStore from '../../stores/Cards';
import { removeAllCardsFromLS } from '../../services/localStorage';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const onRemoveAllCards = () => {
    cardsStore.removeAllCards();
    removeAllCardsFromLS();
  }
  
  return (
    <header className={styles.header}>
      <Form />
      <button className={styles.removeAll} onClick={onRemoveAllCards}>Remove all</button>
      <SelectLanguage />
    </header>
  );
}

export default Header;
