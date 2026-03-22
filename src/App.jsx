import { useEffect, useState } from 'react';
import './App.css';
import { getWeatherData } from './service/weatherService';

const themes = {
  Clear: "from-orange-400 to-yellow-200",
  Rain: "from-blue-700 to-slate-900",
  Clouds: "from-gray-400 to-gray-600",
  Snow: "from-blue-100 to-blue-300",
  Default: "from-sky-500 to-blue-600"
};

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

  const condition = weather?.weather[0]?.main;
  const currentTheme = themes[condition] || themes.Default;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center text-white transition-all duration-1000 bg-gradient-to-br ${currentTheme}`}>
      <h1
        className="text-4xl font-bold mb-8 drop-shadow-md">
        Weather APP
      </h1>

      <div className="flex gap-2 mb-10">
        <input
          className="p-3 rounded-lg text-black shadow-lg outline-none w-64"
          placeholder="Enter city..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button
          className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-bold backdrop-blur-sm transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {weather ? (
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center border border-white/20">
          <h2 className="text-3xl mb-2">{weather.name}</h2>
          <p className="text-7xl font-black mb-4">{Math.round(weather.main.temp)}°C</p>
          <p className="text-xl capitalize tracking-widest">{weather.weather[0].main}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  )
}

export default App
