import { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh, FaWind, FaTint } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "3c3a706e3193f2b7ccbd1b1af6837509";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  function getWeather() {
    setError("");
    setLoading(true);

    axios
      .get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setWeatherData(response.data);
        setCity("");
        setLoading(false);
      })
      .catch(() => {
        setError("Oops! City not found. Try again 🌎");
        setWeatherData(null);
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 text-white px-4 text-center">
      <h1 className="text-6xl font-extrabold mb-6 tracking-wider">
        Weather Forecast☁️
      </h1>
      <WeatherInput setCity={setCity} getWeather={getWeather} />
      {loading && <LoadingAnimation />}
      {error && !loading && <ErrorMessage error={error} />}
      {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
};

function WeatherInput({ setCity, getWeather }) {
  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };
  return (
    <div className="mb-6 space-x-4 flex flex-col sm:flex-row">
      <input
        className="p-4 w-full sm:w-96 text-lg rounded-full border-none focus:ring focus:ring-blue-500 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 transition duration-300 ease-in-out"
        type="text"
        placeholder="Enter you city . . . 🏙️"
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyEnter}
      />
      <button
        className="px-6 py-3 mt-4 sm:mt-0 text-lg font-bold rounded-full bg-blue-800 text-gray-200 hover:bg-blue-900 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-110"
        onClick={getWeather}
      >
        Search🔎
      </button>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-4 text-xl font-semibold animate-pulse">
        Fetching Data...
      </p>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <p className="text-xl font-semibold text-red-600 mt-6 animate-shake">
      {error}
    </p>
  );
}

function WeatherDisplay({ weatherData }) {
  console.log(weatherData.weather);

  return (
    <div className="bg-white bg-opacity-20 p-8 rounded-3xl shadow-2xl mt-8 max-w-sm text-white hover:scale-105 transform transition-transform duration-300">
      <h2 className="text-3xl font-extrabold mb-4">🌍 {weatherData.name}</h2>
      <div className="space-y-3 text-lg">
        <p className="flex items-center">
          <FaTemperatureHigh className="mr-3 text-red-400" />
          <span>Temperature:</span> {Math.floor(weatherData.main.temp)}°C
        </p>
        <p className="flex items-center">
          <FaWind className="mr-3 text-blue-400" />
          <span>Wind Speed:</span> {weatherData.wind.speed} m/s
        </p>
        <p className="flex items-center">
          <FaTint className="mr-3 text-teal-400" />
          <span>Humidity:</span> {weatherData.main.humidity}%
        </p>
        <p>
          <span>Weather:</span> {weatherData.weather[0].description}
        </p>
      </div>
    </div>
  );
}

export default App;
