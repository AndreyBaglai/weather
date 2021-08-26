import React from 'react';
import { CardModel } from '../../model/card-model';
import { getWeatherByCity } from '../../services/weather-api';
import languageStore from '../../store/language';
import cardsStore from '../../store/cards';

import { setCardsToLS } from '../../services/localStorage';
import { observer } from 'mobx-react-lite';

import './Form.scss';

const Form = observer(() => {
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.querySelector('#city') as HTMLInputElement;
    const cityName = input.value;

    try {
      if (cityName === '') return;

      const data = await getWeatherByCity(cityName, languageStore.lang);
      if (!data) return;

      const card: CardModel = {
        id: Math.round(Date.now() + Math.random()),
        city: data.name,
        time: data.dt,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        feels: data.main.feels_like,
        icon: data.weather[0].icon,
        text_icon: data.weather[0].main,
        description: data.weather[0].description,
        wind_speed: data.wind.speed,
        isCelsius: true,
      };

      input.value = '';

      cardsStore.addCard(card);
      setCardsToLS(cardsStore.totalCards);
    } catch (err) {
      input.value = '';
      console.log('Incorrect city name');
    }
  };

  return (
    <form className="form" onSubmit={onSubmitForm}>
      <input type="text" className="city-field" name="city" id="city" placeholder="City name..." />
      <button id="addBtn">Add</button>
    </form>
  );
});

export default Form;
