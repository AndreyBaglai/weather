import { NOT_FOUND_CODE } from "../utils/const";

export const getWeatherByCity = (city: string, lang = 'en') => {
  return fetch(`${process.env.REACT_APP_WEATHER_URL}?q=${city}&units=metric&lang=${lang}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then((res: Response) => {
      if (res.status === NOT_FOUND_CODE) return;
      return res.json();
    })
    .then((data) => data);
}
