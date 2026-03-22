import { useEffect, useState } from 'react';
import './App.css';
import { getWeatherData } from './service/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData('Stevenage');
      setWeather(data);
    }

    fetchWeather();
  }, []);

  const handleSearch = async () => {
    if (!city) {
      return;
    }

    const inputData = await getWeatherData(city);
    setWeather(inputData);
  }

  return (
    <>
      <h1>Weather APP</h1>

      <div className="App">
        <input value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {weather ? (
          <div>
            <h2>{weather.name}</h2>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].main}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default App
