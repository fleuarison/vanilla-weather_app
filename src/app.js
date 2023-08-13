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
  
  function weatherCity(response) {
    document.querySelector("#new-city").innerHTML = response.data.name;
    document.querySelector("#degree").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
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