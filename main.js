//https://api.foursquare.com/v2/venues/4bbdea8c8a4fb71387863d9d/photos?/&v=20200329&client_id=CIADO1WQRLMX5FIFY15WAPM4RHIM20JRUYMQ33JBYF3JLQHW&client_secret=FF0OBP41LPYMWZLEDK1OWIACMZXJXC4GNT41T0RV0CU43E50&v=20200331
/*
const venueImgSrc = await getPic(venue.id)
getPic has to return a url for the picture

parsing json
*/




const Foursquare = {
  clientId: 'UH4RJTM0ZJEHTV0W5BV0UVQB5FX3IEFE3MTZSTEKBT4L11GU',
  clientSecret: '3MWY2GU44S2D12CEVKXPKLQDIOJZJV5G214K1C2Y05DEC4GP',
  url: 'https://api.foursquare.com/v2/venues/explore?near=',
  getPhotoUrl: 'https://api.foursquare.com/v2/venues/'
};

// OpenWeather Info
const OpenWeather = {
  openWeatherKey: 'c2672755c26f184c4d88061ddabda942',
  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
};

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${Foursquare.url}${city}&limit=10&client_id=${Foursquare.clientId}&client_secret=${Foursquare.clientSecret}&v=20200325`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }

  } catch (error) {
    console.log(error);
  }
};


const renderVenues = async (venues) => {

  try {
    $venueDivs.forEach(($venue, index) => {
      const venue = venues[random(index)];
      const photo_id = venue.id;
      const photoUrlToFetch = `https://api.foursquare.com/v2/venues/${photo_id}/photos?/&v=20200329&client_id=${Foursquare.clientId}&client_secret=${Foursquare.clientSecret}`

      fetch(photoUrlToFetch)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          imgLink = `${jsonResponse.response.photos.items[0].prefix}` + `100x100` + `${jsonResponse.response.photos.items[0].suffix}`;
          const category = venue.categories[0].name;
          const venueContent = createVenueHTML(venue.name, venue.location, imgLink, category);
          $venue.append(venueContent);
        });
    });

    $destination.append(`<h2>${venues[0].location.city}</h2>`);

  }
  catch (error) {
    console.log(error)
  }
}



const getForecast = async () => {
  const urlToFetch = `${OpenWeather.weatherUrl}?&q=${$input.val()}&APPID=${OpenWeather.openWeatherKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();;
      return jsonResponse;
    }


  } catch (error) {
    console.log(error);
  }

};

const renderForecast = (day) => {
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)



