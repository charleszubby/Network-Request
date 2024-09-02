const fetchBtn = document.querySelector("#fetch-btn");
const weatherDiv = document.querySelector(".forecast-div");

const fetchWeatherHandler = () => {
  //   console.log(navigator);
  if (!navigator.geolocation) {
    weatherDiv.innerHTML = "<h3>Geolocation not supported by brouser</h3>";
    return;
  }

  //bGetting the current geolocation
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitudes = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = "79d869214e61f9a20d08640b1baef35b";
      // onstruct the apiUrl with the latit
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudes}&lon=${longitude}&&appid=${apiKey}&units=metric`;

      // Fetching weather data from the apiURL
      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      document.querySelector(".temp-value").textContent = data.main.temp;
      document.querySelector(".point").textContent = data.name;
      document.querySelector(".des").textContent = data.weather[0].description;
      // const weatherInfo = `<h1>Weather Info </h1>
      // <p>Temperature: ${data.main.temp}</p>`;
      // weatherDiv.innerHTML = weatherInfo;
    },
    (error) => {
      weatherDiv.innerHTML = `<h3>Error getting geolocation: ${error.message} </h3>`;
    }
  );
};

fetchBtn.addEventListener("click", fetchWeatherHandler);
