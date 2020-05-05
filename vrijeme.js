//api kljuc: 6cec8bfa795f38c54deb5f34bf941f4d

//konstante
const NOTIFICATION= document.querySelector(".notification")
const ICON = document.querySelector(".weather-icon")
const TEMP = document.querySelector(".temp-value p")
const DESC = document.querySelector(".temp-description p")
const LOCATION = document.querySelector(".location p")

const WEATHER={
    temperature :{
        
        unit:"celsius"
    }
    
}

const KELVIN = 273;
// API KEY
const key = "6cec8bfa795f38c54deb5f34bf941f4d";



if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    NOTIFICATION.style.display = "block";
    NOTIFICATION.innerHTML = "<p>Vaš preglednik nema sustav pozicioniranja(lokaciju)</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    NOTIFICATION.style.display = "block";
    NOTIFICATION.innerHTML = `<p> ${error.message} </p>`;
}



function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            WEATHER.temperature.value = Math.floor(data.main.temp - KELVIN);
            WEATHER.description = data.weather[0].description;
            WEATHER.iconId = data.weather[0].icon;
            WEATHER.city = data.name;
            WEATHER.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })};

        

function displayWeather(){
    ICON.innerHTML = `<img src="icons/${WEATHER.iconId}.png"/>`;
    TEMP.innerHTML = `${WEATHER.temperature.value}°<span>C</span>`;
    DESC.innerHTML = WEATHER.description;
    LOCATION.innerHTML = `${WEATHER.city}, ${WEATHER.country}`;
}


function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
TEMP.addEventListener("click", function(){
    if(WEATHER.temperature.value === undefined) return;
    
    if(WEATHER.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        TEMP.innerHTML = `${fahrenheit}°<span>F</span>`;
        WEATHER.temperature.unit = "fahrenheit";
    }else{
        TEMP.innerHTML = `${WEATHER.temperature.value}°<span>C</span>`;
        WEATHER.temperature.unit = "celsius"
    }
});
