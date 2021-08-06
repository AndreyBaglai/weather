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

  return (
    <div className="card">
      <div className="card-top">
        <div className="country-info">
          <div className="country">
            {info.city}, {info.country}
          </div>
          <div>Fri, 19 February, 10:17</div>
        </div>
        <div className="weather-icon">
          <img src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`} alt="Icon" />
          <p className="text-icon">{info.text_icon}</p>
        </div>
      </div>

      <div className="graphic"></div>

      <div className="card-bottom">
        <div className="temperature-wrapper" onClick={onChangeTemperature}>
          <div className="main-temperature">
            <span className="temperature">{Math.ceil(info.temperature) > 0 ? `+${Math.ceil(info.temperature)}` : `-${Math.ceil(info.temperature)}`}</span>
            <span className="metric">
              <span className="celsius">&deg;C</span> |<span className="fahrenheit">&deg;F</span>
            </span>
          </div>
          <div className="feels">Feels like: {Math.ceil(info.feels) > 0 ? `+${Math.ceil(info.feels)}` : `-${Math.ceil(info.feels)}`}</div>
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
