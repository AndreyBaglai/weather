export type CardModel = {
  id: string;
  humidity: number;
  pressure: number;
  wind_speed: number;
  temperature: number;
  city: string;
  country: string;
  icon: string | null | undefined;
  text_icon: string | null | undefined;
  time: number;
  feels: number;
  description: string | null | undefined;
  isCelsius: boolean;
};
