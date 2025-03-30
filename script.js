const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".weather-card");

const apikey = "61265f77c8cae794363bfc75b8b92b0a";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiurl);
  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  return await response.json();
}


  function displayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        wind: { speed },
        weather: [{ description, id }],
    } = data;

   
    card.innerHTML = "";
    card.style.display = "grid"; 

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("citydisplay");

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatheremoji");

    
    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}`;
    tempDisplay.classList.add("tempdisplay");

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description;
    descDisplay.classList.add("descdisplay");

    
    const weatherStats = document.createElement("div");
    weatherStats.classList.add("weather-stats");


    const humidityStat = document.createElement("div");
    humidityStat.classList.add("weather-stat");
    humidityStat.innerHTML = `
        <i class="fas fa-tint"></i>
        <span>${humidity}%</span>
    `;

   
    const speedStat = document.createElement("div");
    speedStat.classList.add("weather-stat");
    speedStat.innerHTML = `
        <i class="fas fa-wind"></i>
        <span>${speed} km/h</span>
    `;

    weatherStats.appendChild(humidityStat);
    weatherStats.appendChild(speedStat);

    card.appendChild(cityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(tempDisplay);
    card.appendChild(weatherStats);
}

function getWeatherEmoji(weatherid) {
  if (weatherid >= 200 && weatherid < 300) return "⛈️";
  if (weatherid >= 300 && weatherid < 400) return "🌧️";
  if (weatherid >= 500 && weatherid < 600) return "🌦️";
  if (weatherid >= 600 && weatherid < 700) return "❄️";
  if (weatherid >= 700 && weatherid < 800) return "💨";
  if (weatherid === 800) return "☀️";
  if (weatherid >= 801 && weatherid < 810) return "☁️";
  return "❓";
}

function displayError(message) {
  card.innerHTML = "";
  card.style.display = "flex";
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errordisplay");
  card.appendChild(errorDisplay);
}
