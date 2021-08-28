import { NOT_FOUND_CODE } from "../variables/variables";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '2904218e66790986ea8f1701ca13b7b5';

export function getWeatherByCity(city: string, lang = 'en') {
  return fetch(`${BASE_URL}weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`)
    .then((res: Response) => {
      if (res.status === NOT_FOUND_CODE) return;
      return res.json();
    })
    .then((data) => data);
}
