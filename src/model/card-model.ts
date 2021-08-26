export type CardModel = {
  id: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  temperature: number;
  city: string;
  country: string;
  icon: string;
  text_icon: string;
  time: number;
  feels: number;
  description: string;
  isCelsius: boolean;
};
