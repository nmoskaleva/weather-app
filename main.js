// Fetch weather data from a city
const getWeatherButton = document.querySelector('#get-weather');

let getInputFieldValue = function() {
  return document.querySelector('#user-city').value;
};

getWeatherButton.addEventListener('click', () => {
  let inputFieldValue = getInputFieldValue();
  if (inputFieldValue != '') {
    getWeather();
  } else {
    alert('Please enter your city');
  }
});

// Call API
function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      document.querySelector('#user-city').value
    }&units=metric&appid=54c9bc00ccd01fc0915e5e7426a30c90`
  )
    .then(response => response.json())
    .then(weatherResponce => {
      showWeather(weatherResponce);
    });
}

function showWeather(weatherResponce) {
  let city = document.querySelector('.city');
  let description = document.querySelector('.description');
  let temp = document.querySelector('.temp');
  let img = document.querySelector('.weather-icon');

  city.innerHTML =
    weatherResponce.name + ' (' + weatherResponce.sys.country + ')';
  description.innerHTML = weatherResponce.weather[0].description;
  temp.innerHTML = Math.floor(weatherResponce.main.temp) + ' C';
  img.src =
    `http://openweathermap.org/img/w/` +
    weatherResponce.weather[0].icon +
    `.png`;
}

// Weather at current location
const locationBtn = document.querySelector('#user-location-btn');
locationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${
        position.coords.longitude
      }&units=metric&appid=54c9bc00ccd01fc0915e5e7426a30c90`
    )
      .then(response => response.json())
      .then(weatherResponce => {
        showWeather(weatherResponce);
      });
  });
});
