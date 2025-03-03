async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    try {
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            alert('City not found');
            return;
        }

        const { lat, lon } = geoData[0];
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Temperature:</strong> ${weatherData.current_weather.temperature} °C</p>
            <p><strong>Weather:</strong> ${weatherData.current_weather.weathercode}</p>
            <p><strong>Wind Speed:</strong> ${weatherData.current_weather.windspeed} km/h</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data');
    }
}
