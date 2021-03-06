import React from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate, formatTime } from 'shared/format-data';

import styles from './styles.module.scss';

interface IProps {
  city: string;
  country: string;
}

const CurrentDate: React.FC<IProps> = ({ city, country }) => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.countryInfo}>
      <div className={styles.country}>
        {city}, {country}
      </div>
      <div className={styles.date}>
        {formatDate(i18n.language)} {formatTime(i18n.language)}
      </div>
    </div>
  );
};

export default CurrentDate;
