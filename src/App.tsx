import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CardModel } from './model/card-model';
import {
  getCurrentUserWeather,
  getWeatherByCity,
  getWeatherByCoordinates,
} from './services/weather-api';

// по городу https://api.openweathermap.org/data/2.5/weather?q=Kiev&units=metric&lang=en&appid=0f3e903b21bbba52b9410fe0033434f1 берем координаты и по координатам
// https://api.openweathermap.org/data/2.5/onecall?lat=50.450001&lon=30.523333&exclude=hourly,minutely&lang=en&units=metric&appid=0f3e903b21bbba52b9410fe0033434f1

function App() {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const card: CardModel | null = getCurrentUserWeather();
    if (card) {
      setCards([card, ...cards]);
    }
  }, []);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.querySelector('#city') as HTMLInputElement;
    const card = await getWeatherByCity(input.value);
    console.log(card);
  };

  const onChangeTemperature = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (target.classList.contains('fahrenheit') && !isCelsius) {
      return;
    }

    if (target.classList.contains('celsius') && isCelsius) {
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
      {/* {cards.length === 0 ? <p>Please, input city name</p> : <Main />} */}
      <Main onChangeTemperature={onChangeTemperature} />
    </div>
  );
}

export default App;
