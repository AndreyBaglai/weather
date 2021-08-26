export function convertToCelsius(temperature: number) {
  return Math.floor(temperature * (9 / 5) + 32);
}

export function convertToFahrenheit(temperature: number) {
  return Math.ceil((temperature - 32) * (5 / 9));
}