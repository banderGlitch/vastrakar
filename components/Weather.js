"use client";
import { useState } from "react";

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!city) return;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/weather?city=${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
    
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    
          {weatherData && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p className="text-5xl font-bold my-4">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="text-gray-600 capitalize">
                {weatherData.weather[0].description}
              </p>
              <div className="flex justify-around mt-6">
                <div>
                  <p className="text-gray-600">Humidity</p>
                  <p className="font-medium">{weatherData.main.humidity}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Wind</p>
                  <p className="font-medium">{weatherData.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
export default Weather;

