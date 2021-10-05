import React from 'react';
import { useTranslation } from 'react-i18next';

import Form from 'components/Form';
import SelectLanguage from 'components/SelectLanguage';

import { useStore } from 'stores';
import { removeAllCardsFromLS } from 'services/localStorage';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { cardsStore } = useStore();
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
