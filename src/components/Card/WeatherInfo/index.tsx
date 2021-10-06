import React from 'react';
import { Trans } from 'react-i18next';

import styles from './styles.module.scss';

interface IProps {
  description: string | null | undefined;
  wind: number;
  humidity: number;
  pressure: number;
  temperature: number;
}

const WeatherInfo: React.FC<IProps> = ({ description, wind, humidity, pressure, temperature }) => {
  return (
    <div className={styles.weatherInfo}>
      <p>{description}</p>
      <p>
        <Trans i18nKey="weather.wind" values={{ value: wind }}>
          Wind <span className={temperature >= 0 ? styles.orangeText : styles.blueText}>m/s</span>
        </Trans>
      </p>
      <p>
        <Trans i18nKey="weather.humidity" values={{ value: humidity }}>
          Humidity <span className={temperature >= 0 ? styles.orangeText : styles.blueText}>%</span>
        </Trans>
      </p>
      <p>
        <Trans i18nKey="weather.pressure" values={{ value: pressure }}>
          Pressure <span className={temperature >= 0 ? styles.orangeText : styles.blueText}>Pa</span>
        </Trans>
      </p>
    </div>
  );
};

export default WeatherInfo;
