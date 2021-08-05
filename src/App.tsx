import { useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const API_KEY = '0f3e903b21bbba52b9410fe0033434f1';

// по городу https://api.openweathermap.org/data/2.5/weather?q=Kiev&units=metric&lang=en&appid=0f3e903b21bbba52b9410fe0033434f1 берем координаты и по координатам
// https://api.openweathermap.org/data/2.5/onecall?lat=50.450001&lon=30.523333&exclude=hourly,minutely&lang=en&units=metric&appid=0f3e903b21bbba52b9410fe0033434f1

function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        let { latitude, longitude } = success.coords;

        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`,
        )
          .then((res) => res.json())
          .then((data) => console.log(data));
      },
      (err) => {
        console.log(err);
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${50.450001}&lon=${30.523333}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`,
        )
          .then((res) => res.json())
          .then((data) => console.log(data));
      },
    );
  }
}

function App() {
  useEffect(() => {
    // fetch(`https://api.openweathermap.org/data/2.5/onecall?q=London&appid=${API_KEY}`)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    // getCurrentWeather();
    // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${45}&lon=${56}&exclude=hourly,minutely&appid=${API_KEY}`).then((res) => res.json())
    // .then((data) => console.log(data));
  });

  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default App;
