import React from 'react';
import { CardModel } from '../../model/card-model';
import './Card.scss';

type CardPropsType = {
  onChangeTemperature: (e: React.MouseEvent) => void;
  info: CardModel;
};

export default function Card({ onChangeTemperature, info }: CardPropsType) {
  const months = [
    'Jun',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const formatTime = () => {
    const date = new Date();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const formatDate = () => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();

    return `${days[day]}, ${date} ${months[month]},`
  };

  return (
    <div className="card">
      <div className="card-top">
        <div className="country-info">
          <div className="country">
            {info.city}, {info.country}
          </div>
          <div className="date">{formatDate()} {formatTime()}</div>
        </div>
        <div className="weather-icon">
          <img className="icon" src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`} alt="Icon" />
          <p className="text-icon">{info.text_icon}</p>
        </div>
      </div>

      <div className="graphic">
        {info.temperature > 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff715b"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#5ba8ff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        )}
      </div>

      <div className="card-bottom">
        <div className="temperature-wrapper" onClick={onChangeTemperature}>
          <div className="main-temperature">
            <span className="temperature">
              {Math.ceil(info.temperature) > 0
                ? `+${Math.ceil(info.temperature)}`
                : `-${Math.ceil(info.temperature)}`}
            </span>
            <span className="metric">
              <span className="celsius">&deg;C</span> |<span className="fahrenheit">&deg;F</span>
            </span>
          </div>
          <div className="feels">
            Feels like:{' '}
            {Math.ceil(info.feels) > 0 ? `+${Math.ceil(info.feels)}` : `-${Math.ceil(info.feels)}`}
          </div>
        </div>
        <div className="weather-info">
          <p>
            Wind: <span className="value">{info.wind_speed}m/s</span>
          </p>
          <p>
            Humidity: <span className="value">{info.humidity}%</span>
          </p>
          <p>
            Pressure: <span className="value">{info.pressure}Pa</span>
          </p>
        </div>
      </div>
    </div>
  );
}
