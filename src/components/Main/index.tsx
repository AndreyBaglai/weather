import React from 'react';
import { observer } from 'mobx-react-lite';

import Loader from 'components/Loader';
import Card from 'components/Card';

import { useStore } from 'stores';
import { CardModel } from 'types/Card';

import { removeCardFromLS, updateCardByIdInLS } from 'services/localStorage';
import { convertToCelsius, convertToFahrenheit } from 'shared/convert-temperature';

import styles from './styles.module.scss';

const Main: React.FC = observer(() => {
  const { loaderStore, cardsStore } = useStore();

  const onChangeInCelsius = ({ currentTarget }: React.MouseEvent) => {
    const targetElem = currentTarget as HTMLElement;
    const id = targetElem.dataset.id;

    if (id) {
      const currentCard: CardModel | undefined = cardsStore.getCardById(id);

      if (currentCard && !currentCard.isCelsius) {
        currentCard.isCelsius = true;
        currentCard.temperature = convertToFahrenheit(currentCard.temperature);

        cardsStore.updateCardTemperature(currentCard.temperature, id);
        updateCardByIdInLS(currentCard, id);
      }
    }
  };

  const onChangeInFahrenheit = ({ currentTarget }: React.MouseEvent) => {
    const targetElem = currentTarget as HTMLElement;
    const id = targetElem.dataset.id;

    if (id) {
      const currentCard: CardModel | undefined = cardsStore.getCardById(id);

      if (currentCard && currentCard.isCelsius) {
        currentCard.isCelsius = false;
        currentCard.temperature = convertToCelsius(currentCard.temperature);

        cardsStore.updateCardTemperature(currentCard.temperature, id);
        updateCardByIdInLS(currentCard, id);
      }
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
            onChangeInCelsius={onChangeInCelsius}
            onChangeInFahrenheit={onChangeInFahrenheit}
            onRemoveCard={onRemoveCard}
            cardInfo={card}
          />
        ))
      )}
    </main>
  );
});

export default Main;
