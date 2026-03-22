const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  let response = await fetch(URL);
  let data = await response.json();

  return data;
}