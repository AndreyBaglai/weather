import { TFunction } from 'react-i18next';

export const formatTime = (lang: string) => {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat(lang, {
    hour: 'numeric',
    minute: 'numeric',
  });

  return formatter.format(date);
};

export const formatDate = (lang: string) => {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formatter.format(date);
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
