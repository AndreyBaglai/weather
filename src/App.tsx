import { useEffect } from 'react';

const API_KEY = '0f3e903b21bbba52b9410fe0033434f1';

function App() {
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${API_KEY}`
    ).then((res) => res.json()).then(data => console.log(data));
  });

  return (
    <div className="container">
      <header className="row">
        <div>
          <input type="text" />
          <button>Add city</button>
        </div>
        <div>
          <select name="language" id="lang">
            <option value="EN">EN</option>
            <option value="RU">RU</option>
            <option value="UA">UA</option>
          </select>
        </div>
      </header>
      <main className="row">
        <div className="city-weather">
          <div className="day">
            <div className="top">
              <div className="country-info">
                <span>Dnipro</span>
                <span>UA</span>
              </div>
              <div className="day-info">
                <span>Fri</span>
                <span>19 Fibrary</span>
                <span>10:17</span>
              </div>
              <div className="weather-icon">Icon</div>
            </div>
            <div className="graphic"></div>
            <div className="bottom">
              <div>+3 C | F</div>
              <div className="weather-info">
                <ul>
                  <li>
                    Wind: <span>1</span>
                  </li>
                  <li>
                    Humiditi: <span>1</span>
                  </li>
                  <li>
                    Pressure: <span>1</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="day">
            <div className="top">
              <div className="country-info">
                <span>Dnipro</span>
                <span>UA</span>
              </div>
              <div className="day-info">
                <span>Fri</span>
                <span>19 Fibrary</span>
                <span>10:17</span>
              </div>
              <div className="weather-icon">Icon</div>
            </div>
            <div className="graphic"></div>
            <div className="bottom">
              <div>+3 C | F</div>
              <div className="weather-info">
                <ul>
                  <li>
                    Wind: <span>1</span>
                  </li>
                  <li>
                    Humiditi: <span>1</span>
                  </li>
                  <li>
                    Pressure: <span>1</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="day">
            <div className="top">
              <div className="country-info">
                <span>Dnipro</span>
                <span>UA</span>
              </div>
              <div className="day-info">
                <span>Fri</span>
                <span>19 Fibrary</span>
                <span>10:17</span>
              </div>
              <div className="weather-icon">Icon</div>
            </div>
            <div className="graphic"></div>
            <div className="bottom">
              <div>+3 C | F</div>
              <div className="weather-info">
                <ul>
                  <li>
                    Wind: <span>1</span>
                  </li>
                  <li>
                    Humiditi: <span>1</span>
                  </li>
                  <li>
                    Pressure: <span>1</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
