import React, { useEffect, useState } from 'react';

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  // گرفتن موقعیت مکانی کاربر
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
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
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=69477da39ac3c78569c0c90d7d5791e1&units=metric&lang=fa`
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

  
  const getBackgroundStyle = () => {
    if (!weather || !weather.weather) return {};
  
    const main = weather.weather[0].main.toLowerCase();
  
    switch (main) {
      case 'clear':
        return { background: 'linear-gradient(to top, #fceabb, #f8b500)', color: '#333' }; // آفتابی
      case 'clouds':
        return { background: 'linear-gradient(to top, #d7d2cc, #304352)', color: '#fff' }; // ابری
      case 'rain':
      case 'drizzle':
        return { background: 'linear-gradient(to top, #4b79a1, #283e51)', color: '#fff' }; // بارانی
      case 'snow':
        return { background: 'linear-gradient(to top, #e6dada, #274046)', color: '#333' }; // برفی
      case 'fog':
      case 'mist':
        return { background: 'linear-gradient(to top, #3e5151, #decba4)', color: '#333' }; // مه
      case 'thunderstorm':
        return { background: 'linear-gradient(to top, #141e30, #243b55)', color: '#fff' }; // طوفانی
      default:
        return { background: '#f0f0f0', color: '#333' }; // پیش‌فرض
    }
  };
  

  return (
    <div style={{
      textAlign: 'center',
      padding: 50,
      fontFamily: 'Tahoma',
      minHeight: '100vh',
      ...getBackgroundStyle()
    }}>
      <h1>برنامه آب‌وهوا ☀️🌧️</h1>

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
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="وضعیت آسمان"
          />
          <p>🌡️ دما: {weather.main.temp} درجه سانتی‌گراد</p>
          <p>🌤️ آسمان: {weather.weather[0].description}</p>
        </div>
      ) : (
        location.lat && <p>در حال دریافت اطلاعات آب‌وهوا...</p>
      )}
    </div>
  );
}

export default App;