import React, { useEffect, useState, useCallback } from 'react';
import './App.css'; // Adding CSS file

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get API Key from environment variables
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Translation table for Persian to Dari (extended)
  const translationTable = {
    "استان": "ولایت",
    "شهر": "شهر",
  };

  // Translation function
  const translateToDari = useCallback((text) => {
    if (!text) return text;

    // Replace words using the translation table
    Object.keys(translationTable).forEach((key) => {
      text = text.replace(new RegExp(key, "g"), translationTable[key]);
    });

    return text;
  }, [translationTable]);

  // Fetch weather data based on geographic coordinates
  const fetchWeatherByLocation = useCallback((lat, lon) => {
    if (!lat || !lon) return;

    setLoading(true);
    setError('');
    // Change URL to Weatherbit API
    fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&lang=fa`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          const weatherData = data.data[0];
          setWeather({
            name: weatherData.city_name,
            main: { temp: weatherData.temp },
            weather: [{ main: weatherData.weather.description.toLowerCase(), description: weatherData.weather.description, icon: weatherData.weather.icon }]
          });
        } else {
          setError('خطا در دریافت اطلاعات آب‌وهوا!'); // Error message in Persian
        }
      })
      .catch(() => {
        setError('خطا در دریافت اطلاعات آب‌وهوا.'); // Error message in Persian
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_KEY]);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lon: longitude });

          // Call function to fetch weather data based on coordinates
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          setError('دسترسی به موقعیت مکانی رد شد یا خطایی رخ داد.'); // Error message in Persian
        }
      );
    } else {
      setError('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.'); // Error message in Persian
    }
  }, [fetchWeatherByLocation]);

  // Fetch weather data based on city name
  const fetchWeatherByCity = useCallback(() => {
    if (!city) return;

    setLoading(true);
    setError('');
    // Change URL to Weatherbit API
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}&lang=fa`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          const weatherData = data.data[0];
          setWeather({
            name: weatherData.city_name,
            main: { temp: weatherData.temp },
            weather: [{ main: weatherData.weather.description.toLowerCase(), description: weatherData.weather.description, icon: weatherData.weather.icon }]
          });
          setLocation({ lat: weatherData.lat, lon: weatherData.lon });
        } else {
          setError('شهر پیدا نشد!'); // Error message in Persian
        }
      })
      .catch(() => {
        setError('خطا در دریافت اطلاعات شهر.'); // Error message in Persian
      })
      .finally(() => {
        setLoading(false);
        setCity(""); // Clear input field
      });
  }, [city, API_KEY]);

  // Select CSS class based on weather condition
  const getBackgroundClass = () => {
    if (!weather || !weather.weather) return 'default';

    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return 'clear'; // Sunny
      case 'clouds':
        return 'clouds'; // Cloudy
      case 'rain':
      case 'drizzle':
        return 'rain'; // Rainy
      case 'snow':
        return 'snow'; // Snowy
      case 'fog':
      case 'mist':
        return 'fog'; // Foggy
      case 'thunderstorm':
        return 'thunderstorm'; // Stormy
      default:
        return 'default'; // Default
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <h1>وضعیت آب‌و‌هوا ☀️🌧️</h1>

      {/* City search section */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="نام شهر را وارد کنید..." // Placeholder in Persian
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeatherByCity();
            }
          }}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            width: '200px',
          }}
        />
        <button
          onClick={fetchWeatherByCity}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          search
        </button>
      </div>

      {/* Display error */}
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>
          {error}
        </div>
      )}

      {/* Display loading */}
      {loading && (
        <div style={{ marginBottom: 10 }}>
          در حال دریافت اطلاعات... // Loading message in Persian
        </div>
      )}

      {/* Weather information */}
      {weather && weather.main && weather.weather ? (
        <div>
          <h2>{translateToDari(weather.name)}</h2>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${weather.weather[0].icon}.png`}
            alt="وضعیت آسمان" // Alt text in Persian
          />
          <p>🌡️ دما: {weather.main.temp} درجه سانتی‌گراد</p> {/* Temperature in Persian */}
          <p>🌤️ آسمان: {translateToDari(weather.weather[0].description)}</p> {/* Sky description in Persian */}
        </div>
      ) : (
        location.lat && !loading && !error && <p>در حال دریافت اطلاعات آب‌وهوا...</p> // Message in Persian
      )}
    </div>
  );
}

export default App;