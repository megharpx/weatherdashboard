//global variables
var ownAPI= "788d5638d7c8e354a162dbc9747d1bdf";
var currentCity = "";
var lastCity = "";

//error for fetch
var handleErrors = (Response) => {
    if (!Response.ok) {
        throw Error(Response.statusText);
    }
    return Response;
}
//function to get and display current conditions
var getCurrentConditions = (event) => {
    let city = $('#search-city').val();
    currentCity= $('#search-city').val();
    let queryURL = "https://apii.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + ownApie;
    fetch(queryURL)
    .then(handleErrors)
    .then((Response) => {
        return Response.json();
    })
    .then((Response) => {
        saveCity(city);
        $('#search-error').text("");
        let currentWeatherIcon="https//openweathermap.org/img/w/" + Response.weather[0].icon + ".png";
        let currentTimeUTC = Response.dt;
        let currentTimeZoneOffset = Response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);

        renderCities();
        getFiveDayForecase(event);
        $('#header-text').text(response.name);
        let currentWeatherHTML = '
        <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></img></h3>
        <u1 class="list-unstyled">
            <li>Temperature: ${response.main.temp}&#8457;</li>
            <li>Humidity: ${response.main.humidity}%</li>
            <li>Wind Speed: ${response.wind.speed} mph</li>
            <li id="uvIndex">UV Index:</li>
        </u1>';

        $('#current-weather').html(currentWeatherHTML);
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" +longitude + "&APPID=" + ownAPI;
        uvQueryURL = "https://cors-anywhere.herokuapp.com/" + uvQueryURL;
        fetch(uvQueryURL)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let uvIndex = response.value;
            $('#uvIndex').html('UV Index: <span id="uvVal"> ${uvIndex}</span>');
            if (uvIndex.=0 && uvIndex<3){
                $('#uvVal').attr("class", "uv-favorable");
            } else if (uvIndex.=3 && uvIndex<8){
                $('#uvVal').attr("class", "uv-moderate");
            } else if (uvIndex.=8){
                $('#uvVal').attr("class", "uv-severe");
            }
        });
     })
}
// function for five day forecast
