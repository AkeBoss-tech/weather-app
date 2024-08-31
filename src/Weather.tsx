import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

// Interface for the current weather data structure
interface WeatherData {
    name: string;  // City name
    sys: { country: string };  // Country code
    weather: { main: string; description: string }[];  // Weather conditions
    main: { temp: number; humidity: number };  // Temperature and humidity
    wind: { speed: number };  // Wind speed
}

// Interface for the 5-day forecast data structure
interface ForecastData {
    list: {
        dt_txt: string;  // Date and time
        main: { temp: number };  // Temperature
        weather: { main: string; description: string }[];  // Weather conditions
        wind: { speed: number; deg: number };  // Wind speed and direction
        clouds: { all: number };  // Cloudiness percentage
    }[];
}

const Weather: React.FC = () => {
    // State for storing the user input city name
    const [city, setCity] = useState<string>('');
    
    // State for storing the fetched current weather data
    const [weather, setWeather] = useState<WeatherData | null>(null);
    
    // State for storing the fetched 5-day forecast data
    const [forecast, setForecast] = useState<ForecastData | null>(null);

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

    // Function to fetch the current weather data from the API
    const fetchWeather = async () => {
        try {
            const response = await axios.get<WeatherData>(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    // Function to fetch the 5-day forecast data from the API
    const fetchForecast = async () => {
        try {
            const response = await axios.get<ForecastData>(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
            );
            setForecast(response.data);
        } catch (error) {
            console.error("Error fetching forecast data: ", error);
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
                onChange={(e) => setCity(e.target.value)}  // Update the city state with the user input
            />
            <button onClick={handleSearch}>Get Weather</button>

            {/* Display the current weather information if available */}
            {weather && (
                <div className="current-weather">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <div className="icon">{getWeatherIcon(weather.weather[0].main)}</div>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
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
                                <p>Temp: {day.main.temp}°C</p>
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
