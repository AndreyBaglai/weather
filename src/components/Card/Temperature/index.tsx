import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { formatTemperature } from 'shared/format-data';

import styles from './styles.module.scss';

interface IProps {
  temperature: number;
  id: string;
  onChangeInCelsius: (event: React.MouseEvent) => void;
  onChangeInFahrenheit: (event: React.MouseEvent) => void;
  feels: number;
  isCelsius: boolean;
}

const Temperature: React.FC<IProps> = ({
  temperature,
  id,
  onChangeInCelsius,
  onChangeInFahrenheit,
  feels,
  isCelsius,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.temperatureWrapper}>
      <div className={styles.mainTemperature}>
        <span className={styles.temperature}>{formatTemperature(temperature, i18n.language)}</span>
        <span className={styles.metric}>
          <span
            data-id={id}
            onClick={onChangeInCelsius}
            className={classNames(styles.celsius, { [styles.active]: isCelsius })}>
            &deg;C
          </span>{' '}
          |{' '}
          <span
            data-id={id}
            onClick={onChangeInFahrenheit}
            className={classNames(styles.fahrenheit, { [styles.active]: !isCelsius })}>
            &deg;F
          </span>
        </span>
      </div>
      <div className={styles.feels}>
        {t('weather.feels', {
          value: formatTemperature(Math.ceil(feels), i18n.language),
        })}
      </div>
    </div>
  );
};

export default Temperature;
