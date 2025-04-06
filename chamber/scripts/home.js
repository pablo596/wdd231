document.addEventListener("DOMContentLoaded", () => {
  /*******************************************************
   * 3) Fetch & Display Weather Data
   *******************************************************/
  const weatherCurrentDetails = document.getElementById(
    "weatherCurrentDetails"
  );
  const weatherForecastDetails = document.getElementById(
    "weatherForecastDetails"
  );

  async function fetchWeather() {
    // Replace with your city/country code and valid API key
    const city = "Quito,EC";
    const apiKey = "fb9d68e0acea9b2ee8fb118b13ab1a92";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Weather data not available");
      const data = await response.json();

      // Current weather (data.list[0])
      const currentTemp = data.list[0].main.temp.toFixed(0);
      const currentDescription = data.list[0].weather
        .map((item) => item.description)
        .join(", ");

      // 3-day forecast: data.list[8], data.list[16], data.list[24]
      const forecastDay1 = data.list[8].main.temp.toFixed(0);
      const forecastDay2 = data.list[16].main.temp.toFixed(0);
      const forecastDay3 = data.list[24].main.temp.toFixed(0);

      // (A) Detailed forecast in the middle column
      let output = "";
      data.list.forEach((weather) => {
        output += `
          <div class="weather-card">
            <h5><strong>Date:</strong> ${weather.dt_txt}</h5>
            <hr>
            <p><strong>Temperature:</strong> ${weather.main.temp.toFixed(
              0
            )}°C</p>
            <p><strong>Feels like:</strong> ${weather.main.feels_like.toFixed(
              0
            )}°C</p>
            <p><strong>Pressure:</strong> ${weather.main.pressure} hPa</p>
            <p><strong>Sea level:</strong> ${
              weather.main.sea_level || "N/A"
            } m</p>
            <p><strong>Humidity:</strong> ${weather.main.humidity}%</p>
            <p><strong>Conditions:</strong> ${capitalizeWords(
              weather.weather.map((item) => item.description).join(", ")
            )}</p>
            <p><strong>Wind speed:</strong> ${weather.wind.speed} m/s</p>
          </div>`;
      });
      weatherCurrentDetails.innerHTML = output;

      // (B) Simple 3-day forecast in the right column
      weatherForecastDetails.innerHTML = `
        <ul>
          <li><strong>Day 1:</strong> ${forecastDay1}°C</li>
          <li><strong>Day 2:</strong> ${forecastDay2}°C</li>
          <li><strong>Day 3:</strong> ${forecastDay3}°C</li>
        </ul>
      `;
    } catch (error) {
      console.error("Error fetching weather:", error);
      weatherCurrentDetails.innerHTML = "<p>Weather data not available.</p>";
      weatherForecastDetails.innerHTML = "<p>Forecast data not available.</p>";
    }
  }

  // Helper function: Capitalize each word
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  fetchWeather();

  /*******************************************************
   * 4) Fetch & Display Random Spotlights (Gold / Silver)
   *******************************************************/
  const spotlightsContainer = document.getElementById("spotlights-container");

  async function fetchSpotlights() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Error fetching members data");
      const members = await response.json();

      // Filter only gold or silver membership
      const filtered = members.filter(
        (member) =>
          member.membershipLevel === "Gold" ||
          member.membershipLevel === "Silver"
      );

      // Randomly select 2 or 3
      const randomCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const spotlights = getRandomItems(filtered, randomCount);

      displaySpotlights(spotlights);
    } catch (error) {
      console.error("Error fetching spotlights:", error);
      spotlightsContainer.innerHTML = "<p>Unable to load spotlights.</p>";
    }
  }

  function getRandomItems(array, count) {
    const arrCopy = [...array];
    const result = [];
    while (count > 0 && arrCopy.length > 0) {
      const randIndex = Math.floor(Math.random() * arrCopy.length);
      result.push(arrCopy.splice(randIndex, 1)[0]);
      count--;
    }
    return result;
  }

  function displaySpotlights(spotlights) {
    let output = "";
    spotlights.forEach((member) => {
      output += `
        <div class="member-card">
          <div class="member-card-header">
            <div class="member-card-title">
              <h3 class="business-name">${member.name}</h3>
              <p class="business-tagline">${member.membershipLevel} Member</p>
            </div>
            <!-- Example: Star icon or membership icon if desired -->
          </div>
          <hr>
          <div class="member-card-content">
            <img
              src="images/${member.image}"
              alt="${member.name} Logo"
              class="member-logo"
           >
            <div class="member-info">
              <p><strong>EMAIL:</strong> ${member.email}</p>
              <p><strong>PHONE:</strong> ${member.phone}</p>
              <p><strong>ADDRESS:</strong> ${member.address}</p>
              <p><a href="${member.website}" target="_blank">Visit the website</a></p>
            </div>
          </div>
        </div>
      `;
    });
    spotlightsContainer.innerHTML = output;
  }

  fetchSpotlights();
});
