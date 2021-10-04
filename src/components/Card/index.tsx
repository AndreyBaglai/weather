import React from 'react';
import classNames from 'classnames';

import { CardModel } from 'types/card-model';
import { DAYS, MONTHS } from 'utils/const';

import styles from './styles.module.scss';

interface IProps {
  onChangeInCelsius: (event: React.MouseEvent) => void;
  onRemoveCard: (event: React.MouseEvent) => void;
  onChangeInFahrenheit: (event: React.MouseEvent) => void;
  info: CardModel;
};

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

const formatTemperature = (temperature: number) => {
  const roundedTemperature = Math.ceil(temperature);
  if (roundedTemperature === 0) return '0';

  return roundedTemperature > 0
    ? `+${roundedTemperature}`
    : `-${roundedTemperature}`;
};

const Card: React.FC<IProps> = ({ onRemoveCard, info, onChangeInCelsius, onChangeInFahrenheit }) => {
  return (
    <div className={styles.card} id={String(info.id)} style={{ backgroundColor: info.temperature < 0 ? '#F1F2FF' : '#fff1fe' }}>
      <button className={styles.removeCard} onClick={onRemoveCard}>
        X
      </button>
      <div className={styles.cardTop}>
        <div className={styles.countryInfo}>
          <div className={styles.country}>
            {info.city}, {info.country}
          </div>
          <div className={styles.date}>
            {formatDate()} {formatTime()}
          </div>
        </div>
        <div className={styles.weatherIcon}>
          <img
            className={styles.icon}
            src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`}
            alt="Icon"
          />
          <p className={styles.textIcon}>{info.text_icon}</p>
        </div>
      </div>

      <div className={styles.graphic}>
        {info.temperature > 0 ? (
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
            <span className={styles.temperature}>{formatTemperature(info.temperature)}</span>
            <span className={styles.metric}>
              <span data-id={info.id} onClick={onChangeInCelsius} className={classNames(styles.celsius, { [styles.active]: info.isCelsius })}>&deg;C</span> |{' '}
              <span data-id={info.id} onClick={onChangeInFahrenheit} className={classNames(styles.fahrenheit, { [styles.active]: !info.isCelsius })}>&deg;F</span>
            </span>
          </div>
          <div className={styles.feels}>
            Feels like:
            {Math.ceil(info.feels) > 0 ? `+${Math.ceil(info.feels)}` : `-${Math.ceil(info.feels)}`}
          </div>
        </div>
        <div className={styles.weatherInfo}>
          <p>{info.description}</p>
          <p>
            Wind: <span className={styles.value}>{info.wind_speed}m/s</span>
          </p>
          <p>
            Humidity: <span className={styles.value}>{info.humidity}%</span>
          </p>
          <p>
            Pressure: <span className={styles.value}>{info.pressure}Pa</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;