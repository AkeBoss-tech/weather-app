import React, { useState } from 'react';
// Import your icons as before
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

// Interfaces for the data structures
interface WeatherData {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    weather: { main: string; description: string }[];
    main: { temp: number; humidity: number; pressure: number };
    wind: { speed: number };
}

interface ForecastData {
    list: {
        dt_txt: string;
        main: { temp: number; pressure: number };
        weather: { main: string; description: string }[];
        wind: { speed: number; deg: number };
        clouds: { all: number };
    }[];
}

const Weather: React.FC = () => {
    const [city, setCity] = useState<string>('San Francisco');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCelsius, setIsCelsius] = useState<boolean>(true);
    const [userApiKey, setUserApiKey] = useState<string>('');

    // Sample data for demonstration
    const sampleWeather: WeatherData = {
        "name": "San Francisco",
        "sys": { "country": "US", "sunrise": 1682749440, "sunset": 1682804220 },
        "weather": [{ "main": "Clear", "description": "clear sky" }],
        "main": { "temp": 18.5, "humidity": 63, "pressure": 1015 },
        "wind": { "speed": 3.6 }
    };

    const sampleForecast: ForecastData = {
        "list": [
            { "dt_txt": "2024-08-31 00:00:00", "main": { "temp": 18.5, "pressure": 1015 }, "weather": [{ "main": "Clear", "description": "clear sky" }], "wind": { "speed": 3.6, "deg": 200 }, "clouds": { "all": 0 } },
            { "dt_txt": "2024-09-01 00:00:00", "main": { "temp": 19.0, "pressure": 1016 }, "weather": [{ "main": "Clouds", "description": "few clouds" }], "wind": { "speed": 2.8, "deg": 180 }, "clouds": { "all": 20 } },
            { "dt_txt": "2024-09-02 00:00:00", "main": { "temp": 17.8, "pressure": 1017 }, "weather": [{ "main": "Rain", "description": "light rain" }], "wind": { "speed": 4.0, "deg": 220 }, "clouds": { "all": 60 } },
            { "dt_txt": "2024-09-03 00:00:00", "main": { "temp": 16.5, "pressure": 1014 }, "weather": [{ "main": "Snow", "description": "light snow" }], "wind": { "speed": 5.0, "deg": 240 }, "clouds": { "all": 80 } },
            { "dt_txt": "2024-09-04 00:00:00", "main": { "temp": 15.2, "pressure": 1013 }, "weather": [{ "main": "Thunderstorm", "description": "thunderstorm" }], "wind": { "speed": 6.0, "deg": 260 }, "clouds": { "all": 90 } }
        ]
    };

    // Function to get the appropriate weather icon based on the weather condition
    const getWeatherIcon = (main: string) => {
        switch (main) {
            case 'Clear': return <WiDaySunny />;
            case 'Clouds': return <WiCloud />;
            case 'Rain': return <WiRain />;
            case 'Snow': return <WiSnow />;
            case 'Thunderstorm': return <WiThunderstorm />;
            default: return <WiCloud />;
        }
    };

    // Function to convert temperature between Celsius and Fahrenheit
    const convertTemp = (temp: number) => {
        return isCelsius ? temp : (temp * 9/5) + 32;
    };

    // Function to simulate fetching weather data
    const fetchWeather = () => {
        setLoading(true);
        setError(null);
        // Simulate API call
        setTimeout(() => {
            setWeather(sampleWeather);
            setLoading(false);
        }, 1000);
    };

    // Function to simulate fetching forecast data
    const fetchForecast = () => {
        setLoading(true);
        setError(null);
        // Simulate API call
        setTimeout(() => {
            setForecast(sampleForecast);
            setLoading(false);
        }, 1000);
    };

    // Function to handle the search button click event
    const handleSearch = () => {
        fetchWeather();
        fetchForecast();
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}  // Update the city state with user input
            />
            <button onClick={handleSearch}>Get Weather</button>

            {/* Toggle between Celsius and Fahrenheit */}
            <button onClick={() => setIsCelsius(!isCelsius)}>
                {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
            </button>

            {/* Display loading state */}
            {loading && <p>Loading...</p>}

            {/* Display error message if any */}
            {error && <p className="error">{error}</p>}

            {/* Display the current weather information if available */}
            {weather && (
                <div className="current-weather">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <div className="icon">{getWeatherIcon(weather.weather[0].main)}</div>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {convertTemp(weather.main.temp)}°{isCelsius ? 'C' : 'F'}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                </div>
            )}

            {forecast && (
                <div className="forecast">
                    <h2>5-Day Forecast</h2>
                    <div className="forecast-container">
                        {forecast.list.map((day, index) => (
                            <div key={index} className="forecast-item">
                                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                                <div className="icon">{getWeatherIcon(day.weather[0].main)}</div>
                                <p>{day.weather[0].description}</p>
                                <p>Temp: {convertTemp(day.main.temp)}°{isCelsius ? 'C' : 'F'}</p>
                                <p>Pressure: {day.main.pressure} hPa</p>
                                <p>Wind: {day.wind.speed} m/s at {day.wind.deg}°</p>
                                <p>Cloudiness: {day.clouds.all}%</p>
                                <p>Pressure: {day.main.pressure} hPa</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="api-key-input">
                <input
                    type="text"
                    placeholder="Enter API Key (if needed)"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Weather;
