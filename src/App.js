import React, { useEffect, useState, useCallback } from 'react';
import './App.css'; // اضافه کردن فایل CSS

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // دریافت API Key از متغیر محیطی
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // جدول ترجمه فارسی به فارسی دری (کامل‌تر شده)
  const translationTable = {
    "استان": "ولایت",
    "شهر": "شهر",
    "آفتابی": "آفتابی",
    "ابری": "ابری",
    "بارانی": "بارانی",
    "برفی": "برفی",
    "مه": "مه",
    "طوفانی": "طوفانی",
    "رعد و برق": "رعد و برق",
    "باران": "باران",
    "برف": "برف",
    "غبار": "غبار",
    "باد": "باد",
  };

  // تابع ترجمه
  const translateToDari = useCallback((text) => {
    if (!text) return text;

    // جایگزینی کلمات با استفاده از جدول ترجمه
    Object.keys(translationTable).forEach((key) => {
      text = text.replace(new RegExp(key, "g"), translationTable[key]);
    });

    return text;
  }, [translationTable]);

  // دریافت آب‌وهوا بر اساس مختصات جغرافیایی
  const fetchWeatherByLocation = useCallback((lat, lon) => {
    if (!lat || !lon) return;

    setLoading(true);
    setError('');
    // تغییر URL به Weatherbit API
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
          setError('خطا در دریافت اطلاعات آب‌وهوا!');
        }
      })
      .catch(() => {
        setError('خطا در دریافت اطلاعات آب‌وهوا.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_KEY]);

  // گرفتن موقعیت مکانی کاربر
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lon: longitude });

          // فراخوانی تابع برای دریافت اطلاعات آب‌وهوا بر اساس مختصات
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          setError('دسترسی به موقعیت مکانی رد شد یا خطایی رخ داد.');
        }
      );
    } else {
      setError('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.');
    }
  }, [fetchWeatherByLocation]);

  // دریافت آب‌وهوا بر اساس نام شهر
  const fetchWeatherByCity = useCallback(() => {
    if (!city) return;

    setLoading(true);
    setError('');
    // تغییر URL به Weatherbit API
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
          setError('شهر پیدا نشد!');
        }
      })
      .catch(() => {
        setError('خطا در دریافت اطلاعات شهر.');
      })
      .finally(() => {
        setLoading(false);
        setCity(""); // پاک کردن مقدار ورودی
      });
  }, [city, API_KEY]);

  // انتخاب کلاس CSS بر اساس وضعیت آب‌وهوا
  const getBackgroundClass = () => {
    if (!weather || !weather.weather) return 'default';

    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return 'clear'; // آفتابی
      case 'clouds':
        return 'clouds'; // ابری
      case 'rain':
      case 'drizzle':
        return 'rain'; // بارانی
      case 'snow':
        return 'snow'; // برفی
      case 'fog':
      case 'mist':
        return 'fog'; // مه
      case 'thunderstorm':
        return 'thunderstorm'; // طوفانی
      default:
        return 'default'; // پیش‌فرض
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <h1>وضعیت آب‌و‌هوا ☀️🌧️</h1>

      {/* بخش جستجوی شهر */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="نام شهر را وارد کنید..."
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

      {/* نمایش خطا */}
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>
          {error}
        </div>
      )}

      {/* نمایش لودینگ */}
      {loading && (
        <div style={{ marginBottom: 10 }}>
          در حال دریافت اطلاعات...
        </div>
      )}

      {/* اطلاعات هوا */}
      {weather && weather.main && weather.weather ? (
        <div>
          <h2>{translateToDari(weather.name)}</h2>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${weather.weather[0].icon}.png`}
            alt="وضعیت آسمان"
          />
          <p>🌡️ دما: {weather.main.temp} درجه سانتی‌گراد</p>
          <p>🌤️ آسمان: {translateToDari(weather.weather[0].description)}</p>
        </div>
      ) : (
        location.lat && !loading && !error && <p>در حال دریافت اطلاعات آب‌وهوا...</p>
      )}
    </div>
  );
}

export default App;
