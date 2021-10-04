import React from 'react';
import { useTranslation } from 'react-i18next';

import Form from '../Form';
import SelectLanguage from '../SelectLanguage';
import cardsStore from '../../stores/Cards';
import { removeAllCardsFromLS } from '../../services/localStorage';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { t } = useTranslation();

  const onRemoveAllCards = () => {
    cardsStore.removeAllCards();
    removeAllCardsFromLS();
  }
  
  return (
    <header className={styles.header}>
      <Form />
      <button className={styles.removeAll} onClick={onRemoveAllCards}>{t('buttons.remove')}</button>
      <SelectLanguage />
    </header>
  );
}

export default Header;
