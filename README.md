# Weather App

This Weather App is a React in TypeScript application that allows users to get the current weather and a 5-day forecast for any city. Users can enter the city name, and the app fetches real-time weather data using the OpenWeatherMap API. The app also allows users to toggle between Celsius and Fahrenheit, and it provides detailed weather information, including temperature, humidity, wind speed, pressure, and more.

## Features

- **Current Weather Information**: Get the latest weather details for any city, including temperature, humidity, wind speed, and weather description.
- **5-Day Forecast**: View a detailed 5-day weather forecast with advanced details such as temperature, wind speed, pressure, and cloudiness.
- **Unit Conversion**: Toggle between Celsius and Fahrenheit.
- **Loading and Error Handling**: The app includes loading states and error handling to manage API requests effectively.
- **Custom API Key Input**: Users can enter their own OpenWeatherMap API key directly in the app.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your system.
- **npm**: npm (Node Package Manager) is required to install dependencies.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the environment variables**:
    - Create a `.env` file in the root directory of the project.
    - Add your OpenWeatherMap API key to the `.env` file:
    ```plaintext
    OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
    ```

    > Note: If the API key is not provided in the `.env` file, users can manually enter their API key in the app.

4. **Start the application**:
    ```bash
    npm start
    ```

    The app should now be running on `http://localhost:3000`.

    Alternatively, the [GitHub pages site]() may be used.

## Usage

1. **Enter a city name** in the input field and click the "Get Weather" button to fetch the current weather and 5-day forecast.

2. **Toggle between Celsius and Fahrenheit** by clicking the "Switch to Fahrenheit" or "Switch to Celsius" button.

3. **Enter or change the API key** using the provided input field if you have a different OpenWeatherMap API key.

## Project Structure

```plaintext
├── public
│   ├── index.html
├── src
│   ├── components
│   │   ├── Weather.tsx     # Main Weather component
│   ├── App.tsx             # Root component
│   ├── index.tsx           # Entry point
│   ├── Weather.css         # Styles for the Weather component
│   └── ...
├── .env                    # Environment variables (not included in the repo)
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Dependencies
* React: A JavaScript library for building user interfaces.
* Axios: A promise-based HTTP client for making API requests.
* react-icons: A library for including popular icons in your React project.