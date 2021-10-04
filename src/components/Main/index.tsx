import React from 'react';
import { observer } from 'mobx-react-lite';

import Loader from 'components/Loader';
import Card from 'components/Card';

import { CardModel } from '../../types/card-model';

import { useStore } from 'stores';

import { removeCardFromLS, updateCardByIdInLS } from '../../services/localStorage';
import { convertToCelsius, convertToFahrenheit } from '../../shared/convert-temperature';

import styles from './styles.module.scss';

const Main: React.FC = observer(() => {
  const { loaderStore, cardsStore } = useStore();

  const onChangeTemperature = ({ currentTarget, target }: React.MouseEvent) => {
    // const currentTarget = event.currentTarget as HTMLElement;
    const targetElem = target as HTMLElement;

    const id = String(currentTarget.closest('.card')?.id);
    const currentCard = cardsStore.getCardById(id);

    if (currentCard) {
      if (currentCard.isCelsius && targetElem.classList.contains('fahrenheit')) {
        currentCard.isCelsius = false;
        currentCard.temperature = convertToCelsius(currentCard.temperature);
      }

      if (!currentCard.isCelsius && targetElem.classList.contains('celsius')) {
        currentCard.isCelsius = true;
        currentCard.temperature = convertToFahrenheit(currentCard.temperature);
      }

      cardsStore.updateCardTemperature(currentCard.temperature, id);
      updateCardByIdInLS(currentCard, id);
    }
  };

  const onRemoveCard = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const id = target.parentElement?.id;

    if (id) {
      cardsStore.removeCardById(id);
      removeCardFromLS(id);
    }
  };

  return (
    <main className={styles.main}>
      {loaderStore.isLoading ? (
        <Loader />
      ) : (
        cardsStore.cards.map((card: CardModel) => (
          <Card
            key={card.id}
            onChangeTemperature={onChangeTemperature}
            onRemoveCard={onRemoveCard}
            info={card}
          />
        ))
      )}
    </main>
  );
});

export default Main;
