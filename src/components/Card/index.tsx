import React from 'react';
import classNames from 'classnames';
import { TFunction, Trans, useTranslation } from 'react-i18next';

import { CardModel } from 'types/Card';

import { ReactComponent as GraphicIcon } from 'sources/icons/graphic.svg';

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

const formatDate = (t: TFunction<"translation">) => {
  const time = new Date();
  const monthIdx = time.getMonth();
  const dayIdx = time.getDay();
  const date = time.getDate();

  const shortMonth = t(`months.month_${monthIdx}`);
  const day = t(`days.day_${dayIdx}`);

  return `${day}, ${date} ${shortMonth},`;
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
            {formatDate(t)} {formatTime()}
          </div>
        </div>
        <div className={styles.weatherIcon}>
          <img
            className={styles.icon}
            src={`${process.env.REACT_APP_WEATHER_ICON_URL}${cardInfo.icon}@2x.png`}
            alt="Icon"
          />
          <p className={styles.textIcon}>{t(`weather.descriptions.description_${cardInfo.text_icon.toLocaleLowerCase()}`)}</p>
        </div>
      </div>

      <div className={styles.graphic}>
      <ul className={styles.tempList}>
          <li>10</li>
          <li>13</li>
          <li>16</li>
          <li>13</li>
          <li>10</li>
          <li>10</li>
          <li>07</li>
        </ul>

        <GraphicIcon className={cardInfo.temperature > 0 ? styles.redGraphic : styles.blueGraphic}/>

        <ul className={styles.week}>
          <li>19.04</li>
          <li>20.04</li>
          <li>21.04</li>
          <li>22.04</li>
          <li>23.04</li>
          <li>24.04</li>
          <li>25.04</li>
        </ul>
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