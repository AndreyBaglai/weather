import React from 'react';
import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';

import Button from 'components/Button';

import Graphic from './Graphic';

import { CardModel } from 'types/Card';
import { formatDate, formatTemperature, formatTime } from 'shared/format-data';

import styles from './styles.module.scss';

interface IProps {
  onChangeInCelsius: (event: React.MouseEvent) => void;
  onRemoveCard: (event: React.MouseEvent) => void;
  onChangeInFahrenheit: (event: React.MouseEvent) => void;
  cardInfo: CardModel;
}

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
      <Button classBtn={styles.removeCard} handler={onRemoveCard}>
        X
      </Button>

      <div className={styles.cardTop}>
        <div className={styles.countryInfo}>
          <div className={styles.country}>
            {cardInfo.city}, {cardInfo.country}
          </div>
          <div className={styles.date}>
            {formatDate(t, i18n.language)} {formatTime()}
          </div>
        </div>

        <div className={styles.weatherIcon}>
          <img
            className={styles.icon}
            src={`${process.env.REACT_APP_WEATHER_ICON_URL}${cardInfo.icon}@2x.png`}
            alt="Icon"
          />
          <p className={styles.textIcon}>{t(`weather.descriptions.description_${cardInfo.text_icon?.toLocaleLowerCase()}`)}</p>
        </div>
      </div>

      <Graphic temperature={cardInfo.temperature} />

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