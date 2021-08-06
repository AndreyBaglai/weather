import React, { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CardModel } from './model/card-model';
import { getCardsFromLS, getLangFromLS, setCardsToLS, setLangToLS } from './services/localStorage';
import { getWeatherByCity } from './services/weather-api';

import './App.scss';

function App() {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [lang, setLang] = useState('en');

  // const init = () => {
  //   const cards = getCardsFromLS();
  //   const currentLang = getLangFromLS();

  //   if (cards.length) {
  //     setCards(cards);
  //   }

  //   currentLang !== '' ? setLang(currentLang) : setLangToLS(lang);
  // };

  useEffect(() => {
    const cards = getCardsFromLS();
    const currentLang = getLangFromLS();

    if (cards.length) {
      setCards(cards);
    }

    currentLang !== '' ? setLang(currentLang) : setLangToLS(lang);
  }, [lang]);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.querySelector('#city') as HTMLInputElement;
    const cityName = input.value;

    try {
      if (cityName === '') return;

      const data = await getWeatherByCity(cityName, lang);
      if (!data) return;

      const card: CardModel = {
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
      };

      const uniqCards = cards.filter((item) => item.city !== card.city);
      input.value = '';

      setCardsToLS([card, ...uniqCards]);
      setCards([card, ...uniqCards]);
    } catch (err) {
      input.value = '';
      console.log('Incorrect city name');
    }
  };

  const onChangeTemperature = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (
      (target.classList.contains('fahrenheit') && !isCelsius) ||
      (target.classList.contains('celsius') && isCelsius)
    ) {
      return;
    }

    const temperatureEl = currentTarget.querySelector('.temperature') as HTMLElement;
    const temperature = Number(
      isCelsius ? temperatureEl?.textContent?.slice(1) : temperatureEl?.textContent,
    );

    if (target.classList.contains('fahrenheit') && temperatureEl) {
      temperatureEl.textContent = String(Math.ceil((temperature * 9) / 5 + 32));
      setIsCelsius(false);
    } else {
      const temp = Math.floor((5 / 9) * (temperature - 32));
      temperatureEl.textContent = String(temp > 0 ? `+${temp}` : `-${temp}`);
      setIsCelsius(true);
    }
  };

  const onSelectLang = (e: React.ChangeEvent) => {
    const target = e.target as HTMLOptionElement;
    const newLang = target.value
    setLangToLS(newLang);
    setLang(newLang);
  };

  return (
    <div className="container">
      <Header onSubmitForm={onSubmitForm} onSelectLang={onSelectLang} />
      {cards.length === 0 ? (
        <p>Please, input city name</p>
      ) : (
        <Main onChangeTemperature={onChangeTemperature} cards={cards} />
      )}
    </div>
  );
}

export default App;
