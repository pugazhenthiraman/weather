
document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "e63e9066801a51712ef59075acf192d0";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
            }

            document.querySelector(".weather").style.display = "block";

            // Save weather data to the backend
            await saveWeatherData(data);
        } catch (error) {
            console.log("Error Fetching weather data", error);
        }
    }

    async function saveWeatherData(data) {
        try {
            await fetch('http://localhost:3000/api/weather/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    city: data.name,
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    weather_description: data.weather[0].main
                })
            });
        } catch (error) {
            console.log("Error saving weather data", error);
        }
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});



