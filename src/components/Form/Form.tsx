import React from 'react';
import uniqId from 'uniqid';
import { useForm } from 'react-hook-form';

import { CardModel } from '../../model/card-model';
import { getWeatherByCity } from '../../services/weather-api';
import languageStore from '../../store/language';
import cardsStore from '../../store/cards';
import { setCardsToLS } from '../../services/localStorage';

import './Form.scss';

type Inputs = {
  city: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitForm = async ({ city }: Inputs) => {
    try {
      if (city === '') return;

      const data = await getWeatherByCity(city, languageStore.lang);
      
      if (!data) return;

      const card: CardModel = {
        id: uniqId(),
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

      cardsStore.addCard(card);
      setCardsToLS(cardsStore.totalCards);
    } catch (err: any) {
      console.log(`Invalid city name ${err}`);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
      <input
        type="text"
        className="city-field"
        id="city"
        placeholder="City name..."
        {...register('city', {
          pattern: {
            value: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Zа-яА-Я\u0080-\u024F]*$/,
            message: 'Must be only letters',
          },
        })}
      />
      {errors.city && <p className="error">{errors.city.message}</p>}
      <button id="addBtn">Add</button>
    </form>
  );
};

export default Form;