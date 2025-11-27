import React, { useState } from 'react';

// Sample static data for demonstration, replace with your own or API data
const countries = [
  { iso2: 'PK', name: 'Pakistan' },
  { iso2: 'US', name: 'United States' },
];

const cities = [
  { name: 'Karachi', country: 'PK' },
  { name: 'Lahore', country: 'PK' },
  { name: 'New York', country: 'US' },
  { name: 'Los Angeles', country: 'US' },
];

export default function WeatherApp() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedCity('');
    setWeather(null);
    const filtered = cities.filter(city => city.country === countryCode);
    setFilteredCities(filtered);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setWeather(null);
  };

  const fetchWeather = async () => {
    if (!selectedCity) return alert('Please select a city');

    const apiKey = 'd1d2e90022f1a8d342adc85de937efe7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        alert('City not found!');
        return;
      }

      const celsius = data.main.temp;
      const fahrenheit = (celsius * 9/5) + 32;
      const kelvin = celsius + 273.15;

      setWeather({ celsius, fahrenheit, kelvin });

    } catch (error) {
      alert('Error fetching weather');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Hello!<br/>Which City weather will you like to see?</h2>

      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(c => (
          <option key={c.iso2} value={c.iso2}>{c.name}</option>
        ))}
      </select>

      <br /><br />

      <select value={selectedCity} onChange={handleCityChange} disabled={!selectedCountry}>
        <option value="">Select City</option>
        {filteredCities.map(city => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>

      <br /><br />

      <button onClick={fetchWeather}>Check Weather</button>

      {weather && (
        <div style={{ marginTop: 20 }}>
          <p>Celsius: {weather.celsius.toFixed(1)}°C</p>
          <p>Fahrenheit: {weather.fahrenheit.toFixed(1)}°F</p>
          <p>Kelvin: {weather.kelvin.toFixed(1)} K</p>
        </div>
      )}
    </div>
  );
}
