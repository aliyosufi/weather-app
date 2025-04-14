import React, { useEffect, useState } from 'react';
import './App.css'; // اضافه کردن فایل CSS

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  // دریافت API Key از متغیر محیطی
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // جدول ترجمه فارسی به فارسی دری
  const translationTable = {
    "استان": "ولایت",
    "شهر": "شهر",
    "آفتابی": "آفتابی",
    "ابری": "ابری",
    "بارانی": "بارانی",
    "برفی": "برفی",
    "مه": "مه",
    "طوفانی": "طوفانی",
  };

  // تابع ترجمه
  const translateToDari = (text) => {
    if (!text) return text;

    // جایگزینی کلمات با استفاده از جدول ترجمه
    Object.keys(translationTable).forEach((key) => {
      text = text.replace(new RegExp(key, "g"), translationTable[key]);
    });

    return text;
  };

  // دریافت آب‌وهوا بر اساس مختصات جغرافیایی
  const fetchWeatherByLocation = (lat, lon) => {
    if (!lat || !lon) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          alert('خطا در دریافت اطلاعات آب‌وهوا!');
        }
      })
      .catch(() => {
        alert('خطا در دریافت اطلاعات آب‌وهوا.');
      });
  };

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
          alert('دسترسی به موقعیت مکانی رد شد یا خطایی رخ داد.');
        }
      );
    } else {
      alert('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.');
    }
  }, []);

  // دریافت آب‌وهوا بر اساس نام شهر
  const fetchWeatherByCity = () => {
    if (!city) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
          setLocation({ lat: data.coord.lat, lon: data.coord.lon });
        } else {
          alert('شهر پیدا نشد!');
        }
      })
      .catch(() => {
        alert('خطا در دریافت اطلاعات شهر.');
      });
  };

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
          جستجو
        </button>
      </div>

      {/* اطلاعات هوا */}
      {weather && weather.main && weather.weather ? (
        <div>
          <h2>{translateToDari(weather.name)}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="وضعیت آسمان"
          />
          <p>🌡️ دما: {weather.main.temp} درجه سانتی‌گراد</p>
          <p>🌤️ آسمان: {translateToDari(weather.weather[0].description)}</p>
        </div>
      ) : (
        location.lat && <p>در حال دریافت اطلاعات آب‌وهوا...</p>
      )}
    </div>
  );
}

export default App;