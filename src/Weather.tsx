import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

// Interfaces for the current weather and forecast data structures
interface WeatherData {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    weather: { main: string; description: string }[];
    main: { temp: number; humidity: number; pressure: number };
    wind: { speed: number };
}

// Interface for the 5-day forecast data structure
interface ForecastData {
    list: {
        dt_txt: string;  // Date and time
        main: { temp: number; pressure: number };  // Temperature and Pressure
        weather: { main: string; description: string }[];  // Weather conditions
        wind: { speed: number; deg: number };  // Wind speed and direction
        clouds: { all: number };  // Cloudiness percentage
    }[];
}

const Weather: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCelsius, setIsCelsius] = useState<boolean>(true);

    // Fetch the API key from environment variables
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

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

    // Function to fetch the current weather data from the API
    const fetchWeather = async () => {
        setLoading(true);  // Set loading state to true
        setError(null);    // Clear any previous errors
        try {
            const response = await axios.get<WeatherData>(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeather(response.data);  // Store the weather data in state
        } catch (error) {
            setError("Failed to fetch weather data. Please try again. Perhaps bad API key?");
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };

    // Function to fetch the 5-day forecast data from the API
    const fetchForecast = async () => {
        setLoading(true);  // Set loading state to true
        setError(null);    // Clear any previous errors
        try {
            const response = await axios.get<ForecastData>(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
            );
            setForecast(response.data);  // Store the forecast data in state
        } catch (error) {
            setError("Failed to fetch forecast data. Please try again.");
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };

    // Function to handle the search button click event
    const handleSearch = () => {
        fetchWeather();  // Fetch the current weather data
        fetchForecast();  // Fetch the 5-day forecast data
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
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
            )}

            {/* Display the 5-day forecast information if available */}
            {forecast && (
                <div className="forecast">
                    <h2>5-Day Forecast</h2>
                    <div className="forecast-container">
                        {forecast.list.filter((_, index) => index % 8 === 0).map((day, index) => (
                            <div key={index} className="forecast-item">
                                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                                <div className="icon">{getWeatherIcon(day.weather[0].main)}</div>
                                <p>{day.weather[0].description}</p>
                                <p>Temp: {convertTemp(day.main.temp)}°{isCelsius ? 'C' : 'F'}</p>
                                <p>Pressure: {day.main.pressure} hPa</p>
                                <p>Wind: {day.wind.speed} m/s at {day.wind.deg}°</p>
                                <p>Cloudiness: {day.clouds.all}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
