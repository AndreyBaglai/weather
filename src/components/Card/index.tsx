import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Graphic from './Graphic';
import WeatherInfo from './WeatherInfo';
import WeatherIcon from './WeatherIcon';
import CurrentDate from './CurrentDate';
import Temperature from './Temperature';

import { CardModel } from 'types/Card';
import { formatTemperature } from 'shared/format-data';

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
        <CurrentDate city={cardInfo.city} country={cardInfo.country} />
        <WeatherIcon icon={cardInfo.icon} text={cardInfo.text_icon?.toLocaleLowerCase()} />
      </div>

      <Graphic temperature={cardInfo.temperature} />

      <div className={styles.cardBottom}>
        <Temperature
          temperature={cardInfo.temperature}
          onChangeInCelsius={onChangeInCelsius}
          onChangeInFahrenheit={onChangeInFahrenheit}
          isCelsius={cardInfo.isCelsius}
          feels={cardInfo.feels}
          id={cardInfo.id}
        />
        <WeatherInfo
          temperature={Math.ceil(cardInfo.temperature)}
          description={cardInfo.description}
          wind={cardInfo.wind_speed}
          humidity={cardInfo.humidity}
          pressure={cardInfo.pressure}
        />
      </div>
    </div>
  );
};

export default Card;
