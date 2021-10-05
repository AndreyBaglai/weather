import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

const Loader: React.FC = () => {
  const { t } = useTranslation();
  
  return <h2 className={styles.loader}>{t('loader')}</h2>;
}

export default Loader;
