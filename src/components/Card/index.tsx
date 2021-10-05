import React from 'react';
import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';

import { CardModel } from 'types/card-model';
import { DAYS, MONTHS } from 'utils/const';

import styles from './styles.module.scss';

interface IProps {
  onChangeInCelsius: (event: React.MouseEvent) => void;
  onRemoveCard: (event: React.MouseEvent) => void;
  onChangeInFahrenheit: (event: React.MouseEvent) => void;
  cardInfo: CardModel;
}

const formatTime = () => {
  const date = new Date();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
};

const formatDate = () => {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();

  return `${DAYS[day]}, ${date} ${MONTHS[month]},`;
};

const formatTemperature = (temperature: number, isHebrew: string) => {
  const roundedTemperature = Math.ceil(temperature);
  if (roundedTemperature === 0) return '0';

  if (isHebrew === 'he') {
    return roundedTemperature > 0 ? `${roundedTemperature}+` : `${Math.abs(roundedTemperature)}-`;
  } else {
    return roundedTemperature > 0 ? `+${roundedTemperature}` : `-${roundedTemperature}`;
  }
};

const Card: React.FC<IProps> = ({
  onRemoveCard,
  cardInfo,
  onChangeInCelsius,
  onChangeInFahrenheit,
}) => {
  const { t, i18n } = useTranslation();
  
  return (
    <div
      className={styles.card}
      id={String(cardInfo.id)}
      style={{ backgroundColor: cardInfo.temperature < 0 ? '#F1F2FF' : '#fff1fe' }}>
      <button className={styles.removeCard} onClick={onRemoveCard}>
        X
      </button>

      <div className={styles.cardTop}>
        <div className={styles.countryInfo}>
          <div className={styles.country}>
            {cardInfo.city}, {cardInfo.country}
          </div>
          <div className={styles.date}>
            {formatDate()} {formatTime()}
          </div>
        </div>
        <div className={styles.weatherIcon}>
          <img
            className={styles.icon}
            src={`https://openweathermap.org/img/wn/${cardInfo.icon}@2x.png`}
            alt="Icon"
          />
          <p className={styles.textIcon}>{cardInfo.text_icon}</p>
        </div>
      </div>

      <div className={styles.graphic}>
        {cardInfo.temperature > 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff715b"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#5ba8ff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        )}
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.temperatureWrapper}>
          <div className={styles.mainTemperature}>
            <span className={styles.temperature}>
              {formatTemperature(cardInfo.temperature, i18n.language)}
            </span>
            <span className={styles.metric}>
              <span
                data-id={cardInfo.id}
                onClick={onChangeInCelsius}
                className={classNames(styles.celsius, { [styles.active]: cardInfo.isCelsius })}>
                &deg;C
              </span>{' '}
              |{' '}
              <span
                data-id={cardInfo.id}
                onClick={onChangeInFahrenheit}
                className={classNames(styles.fahrenheit, { [styles.active]: !cardInfo.isCelsius })}>
                &deg;F
              </span>
            </span>
          </div>
          <div className={styles.feels}>
            {t('weather.feels', {
              value: formatTemperature(Math.ceil(cardInfo.feels), i18n.language),
            })}
          </div>
        </div>
        <div className={styles.weatherInfo}>
          <p>{cardInfo.description}</p>
          <p>
            <Trans i18nKey="weather.wind" values={{ value: cardInfo.wind_speed }}>
              Wind <span className={styles.value}>m/s</span>
            </Trans>
          </p>
          <p>
            <Trans i18nKey="weather.humidity" values={{ value: cardInfo.humidity }}>
              Humidity <span className={styles.value}>%</span>
            </Trans>
          </p>
          <p>
            <Trans i18nKey="weather.pressure" values={{ value: cardInfo.pressure }}>
              Pressure <span className={styles.value}>Pa</span>
            </Trans>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;