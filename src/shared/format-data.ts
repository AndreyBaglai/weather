import { TFunction } from "react-i18next";

export const formatTime = () => {
  const date = new Date();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hours}:${minutes}`;
};

export const formatDate = (t: TFunction<"translation">, lang: string) => {
  const time = new Date();
  const monthIdx = time.getMonth();
  const dayIdx = time.getDay();
  const date = time.getDate();

  const shortMonth = t(`months.month_${monthIdx}`);
  const day = t(`days.day_${dayIdx}`);

  return lang === 'he' ? `${day} ${shortMonth} ${date},`: `${day}, ${date} ${shortMonth},`;
};

export const formatTemperature = (temperature: number, lang: string) => {
  const roundedTemperature = Math.ceil(temperature);
  if (roundedTemperature === 0) return '0';

  if (lang === 'he') {
    return roundedTemperature > 0 ? `${roundedTemperature}+` : `${Math.abs(roundedTemperature)}-`;
  } else {
    return roundedTemperature > 0 ? `+${roundedTemperature}` : `-${roundedTemperature}`;
  }
};