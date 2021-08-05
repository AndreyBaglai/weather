import { useEffect } from 'react';
import './App.scss';

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
      <header className="header">
        

        <select name="language" id="lang" className="select-lang">
          <option value="EN">EN</option>
          <option value="RU">RU</option>
          <option value="UA">UA</option>
        </select>
      </header>
      <main className="main">
        <div className="city-weather">
          <div className="day">
            <div className="day-top">
              <div className="country-info">
                <div>Dnipro, UA</div>
                <div>Fri, 19 February, 10:17</div>
              </div>
              <div className="weather-icon">
                <img src="" alt="Icon" />
                Text
              </div>
            </div>
            <div className="graphic"></div>
            <div className="day-bottom">
              <div className="temperature-wrapper">
                <span className="temperature">+3</span>
                <span className="metric">
                  <span>&deg;C</span> | <span>&deg;F</span>
                </span>
              </div>
              <div className="weather-info">
                <p>
                  Wind: <span className="value">1m/s</span>
                </p>
                <p>
                  Humidity: <span className="value">1%</span>
                </p>
                <p>
                  Pressure: <span className="value">1Pa</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
