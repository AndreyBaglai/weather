import React from 'react';
import { CardModel } from '../../model/card-model';
import './Card.scss';

type CardPropsType = {
  onChangeTemperature: (e: React.MouseEvent) => void;
};

export default function Card({ onChangeTemperature }: CardPropsType) {
  return (
    <div className="card">
      <div className="card-top">
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

      <div className="card-bottom">
        <div className="temperature-wrapper" onClick={onChangeTemperature}>
          <span className="temperature">+3</span>
          <span className="metric">
            <span className="celsius">&deg;C</span> |<span className="fahrenheit">&deg;F</span>
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
  );
}
