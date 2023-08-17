function formatDate(date) {
    let now = new Date();
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  let dateToday = document.querySelector("#date");
  dateToday.innerHTML = formatDate("now");
  
  function getForecast(coordinates){
    let apiKey = "6782253072f7d90462731a624097fc54";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`
    axios.get(apiUrl).then(displayForecast);
  }
  function weatherCity(response) {
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#new-city").innerHTML = response.data.name;
    document.querySelector("#degree").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;

    let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
  
  }
function displayFahreinheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#degree");
    celsiusLink.classList.remove("active");
    fahreinheitLink.classList.add("active");
    let fahreinheitDegree = (celsiusTemperature*9/5) + 32;
    temperatureElement.innerHTML= Math.round(fahreinheitDegree);
}
let celsiusTemperature = null;
  let fahreinheitLink = document.querySelector("#f-link");
  fahreinheitLink.addEventListener ("click", displayFahreinheitTemperature);

  function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#degree");
    celsiusLink.classList.add("active");
    fahreinheitLink.classList.remove("active");
    temperatureElement.innerHTML= Math.round(celsiusTemperature);
}
  let celsiusLink = document.querySelector("#c-link");
  celsiusLink.addEventListener ("click", displayCelsiusTemperature);
  
  function search(cityInput) {
    let apiKey = "6782253072f7d90462731a624097fc54";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(weatherCity);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input").value;
    search(cityInput);
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  search("Antananarivo");
  
  function showPosition(position) {
    let apiKey = "6782253072f7d90462731a624097fc54";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weatherCity);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let locationButton = document.querySelector("#location");
  locationButton.addEventListener("click", getCurrentPosition);

 function formatDay(timestamp){
let date = new Date(timestamp*1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
return days[day];
 }
 
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
      if (index < 6){
      forecastHTML = forecastHTML + `
    <div class="col">
      <div class="weather-forecast-date">
      ${formatDay(forecastDay.dt)}
      </div>
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="icon" class="float-left" width="50"/>
      <div class="weather-forecast-degree">
        <span class="max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>`;}
    });
    forecastHTML = forecastHTML + `</div>` ;
    forecastElement.innerHTML = forecastHTML;
  }