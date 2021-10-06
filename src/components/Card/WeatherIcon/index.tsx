import React from 'react'
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface IProps {
  icon: string | null | undefined;
  text: string | undefined;
}

const WeatherIcon: React.FC<IProps> = ({ icon, text }) => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.weatherIcon}>
    <img
      className={styles.icon}
      src={`${process.env.REACT_APP_WEATHER_ICON_URL}${icon}@2x.png`}
      alt="Icon"
    />
    <p className={styles.textIcon}>
      {t(`weather.descriptions.description_${text}`)}
    </p>
  </div>
  )
}

export default WeatherIcon;
