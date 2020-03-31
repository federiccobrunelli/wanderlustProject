const createVenueHTML = (name, location, imgLink, category) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${imgLink}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>
  <p>"${category}"</p>
`;
}

const createWeatherHTML = (currentDay) => {
  console.log(currentDay)
  return `<h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
    <h2>Wind: ${knotenToKmh(currentDay.wind.speed)} Km/h</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToCelsius = k => ((k - 273.15)).toFixed(0);

const knotenToKmh = kn => (kn * 1.852).toFixed(2);

const random = random => Math.floor(Math.random() * 10); 

