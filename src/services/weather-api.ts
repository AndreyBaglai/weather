// 2904218e66790986ea8f1701ca13b7b5
// 0f3e903b21bbba52b9410fe0033434f1
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '2904218e66790986ea8f1701ca13b7b5';

export function getWeatherByCoordinates(lat: number, long: number): Promise<void> {
  return fetch(
    `${BASE_URL}onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&lang=en&units=metric&appid=${API_KEY}`,
  )
    .then((res) => res.json())
    .then((data) => data);
}

export function getWeatherByCity(city: string) {
  return fetch(
    `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`,
  )
    .then((res) => res.json())
    .then((data) => data);
}

// export function getCurrentUserWeather(): CardModel | null {
//   let weatherData: CardModel | null = null;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (success) => {
//         let { latitude, longitude } = success.coords;
//         const res = await getWeatherByCoordinates(latitude, longitude) as any;

//         if (res) { 
//           const { humidity, pressure, wind_speed, temp } = res.current;

//           weatherData = {
//             humidity,
//             pressure,
//             wind_speed,
//             temp
//           }

//           return weatherData;
//         }
//       },
//       async (err) => {
//         console.log(err);
//         return weatherData;  
//       },
//     );
//   }

//   return weatherData;
// }
