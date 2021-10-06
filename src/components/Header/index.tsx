import React from 'react';
import { useTranslation } from 'react-i18next';

import Form from 'components/Form';
import SelectLanguage from 'components/SelectLanguage';
import Button from 'components/Button';

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
      <Button classBtn={styles.removeAll} handler={onRemoveAllCards}>{t('buttons.remove')}</Button>
      <SelectLanguage />
    </header>
  );
}

export default Header;
