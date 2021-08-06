import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CardModel } from './model/card-model';
import { getCardsFromLS, setCardsToLS } from './services/localStorage';
import { getWeatherByCity } from './services/weather-api';

// по городу https://api.openweathermap.org/data/2.5/weather?q=Kiev&units=metric&lang=en&appid=0f3e903b21bbba52b9410fe0033434f1 берем координаты и по координатам
// https://api.openweathermap.org/data/2.5/onecall?lat=50.450001&lon=30.523333&exclude=hourly,minutely&lang=en&units=metric&appid=0f3e903b21bbba52b9410fe0033434f1

function App() {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const init = () => {
    const cards = getCardsFromLS();

    if (cards.length) {
      setCards(cards);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.querySelector('#city') as HTMLInputElement;

    try {
      if (input.value === '') return;

      const data = await getWeatherByCity(input.value);
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
        wind_speed: data.wind.speed,
      };
      input.value = '';
      setCards([card, ...cards]);
      setCardsToLS([card, ...cards]);
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

  return (
    <div className="container">
      <Header onSubmitForm={onSubmitForm} />
      {cards.length === 0 ? (
        <p>Please, input city name</p>
      ) : (
        <Main onChangeTemperature={onChangeTemperature} cards={cards} />
      )}
    </div>
  );
}

export default App;
