import React from 'react';
import { CardModel } from '../../model/card-model';
import Card from '../Card/Card';
import cardsStore from '../../store/cards';
import { observer } from 'mobx-react-lite';

import './Main.scss';

const Main = observer(() => {
  const onChangeTemperature = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    // if (
    //   (target.classList.contains('fahrenheit') && !store.isCelsius) ||
    //   (target.classList.contains('celsius') && store.isCelsius)
    // ) {
    //   return;
    // }

    const temperatureEl = currentTarget.querySelector('.temperature') as HTMLElement;
    const temperature =
      Number();
      //store.isCelsius ? temperatureEl?.textContent?.slice(1) : temperatureEl?.textContent,

    if (target.classList.contains('fahrenheit') && temperatureEl) {
      temperatureEl.textContent = String(Math.ceil((temperature * 9) / 5 + 32));
      //store.toggleIsCelsius();
    } else {
      const temp = Math.floor((5 / 9) * (temperature - 32));
      temperatureEl.textContent = String(temp > 0 ? `+${temp}` : `-${temp}`);
      // store.toggleIsCelsius();
    }
  };

  return (
    <main className="main">
      {cardsStore.totalCards.map((card: CardModel) => (
        <Card key={card.id} onChangeTemperature={onChangeTemperature} info={card} />
      ))}
    </main>
  );
});

export default Main;
