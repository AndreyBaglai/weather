import { CardModel } from "../model/card-model";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '85d1fc34620a120d4868a2bc8623a0fd';

export function getWeatherByCoordinates(lat: number, long: number): Promise<void> {
  return fetch(
    `${BASE_URL}onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&lang=en&units=metric&appid=${API_KEY}`,
  )
    .then((res) => res.json())
    .then((data) => data);
}

export function getWeatherByCity(city: string) {
  return fetch(
    `${BASE_URL}weather?q=${city}units=metric&appid=${API_KEY}`,
  )
    .then((res) => res.json())
    .then((data) => data);
}

export function getCurrentUserWeather(): CardModel | null {
  let weatherData: CardModel | null = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (success) => {
        let { latitude, longitude } = success.coords;
        const res = await getWeatherByCoordinates(latitude, longitude) as any;

        if (res) { 
          const { humidity, pressure, wind_speed, temp } = res.current;

          weatherData = {
            humidity,
            pressure,
            wind_speed,
            temp
          }

          return weatherData;
        }
      },
      async (err) => {
        console.log(err);
        return weatherData;  
      },
    );
  }

  return weatherData;
}
