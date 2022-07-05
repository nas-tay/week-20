let city = "Moscow";
let lang = "ru";
let units = "metric";
let feelsLike = "Ощущается как: ";
let humid = "Влажность: ";
let windTitle = "Ветер: ";
let speedText = ", со скоростью ";
let speedMetric = " м/с";
let maxText = "Макс. t: ";
let minText = "Мин. t: ";
let wind = "";
let windEn = "";
let errorText = "Город не указан";
let errorTextEn = "City not specified";

function getWeather(city, lang, units) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=35918fd762dc1291fb2f2f84ff61dbb7&units=${units}`)
        .then((response) => response.json())
        .then((weather) => {
            let description = weather.weather[0].description;
            let descriptionUpperCase = description[0].toUpperCase() + description.slice(1);
            let deg = +weather.wind.deg;

            function getWind(deg) {
                if (deg <= 15 || deg > 345) {
                    wind = "Западный";
                    windEn = "West";
                    return;
                }
                if (deg > 15 && deg <= 75) {
                    wind = "Юго-Западный";
                    windEn = "Southwest";
                    return;
                }
                if (deg > 75 && deg <= 105) {
                    wind = "Южный";
                    windEn = "South";
                    return;
                }
                if (deg > 105 && deg <= 165) {
                    wind = "Юго-Восточный";
                    windEn = "Southeast";
                    return;
                }
                if (deg > 165 && deg <= 195) {
                    wind = "Восточный";
                    windEn = "East";
                    return;
                }
                if (deg > 195 && deg <= 255) {
                    wind = "Северо-Восточный";
                    windEn = "Northeast";
                    return;
                }
                if (deg > 255 && deg <= 285) {
                    wind = "Северный";
                    windEn = "North";
                    return;
                }
                if (deg > 285 && deg <= 345) {
                    wind = "Северo-Западный";
                    windEn = "Northwest";
                    return;
                }
            }
            document.querySelector(".cityName").innerText = weather.name;
            document.querySelector(".current").innerText = Math.round(weather.main.temp) + "°";
            document.querySelector(".feels_like").innerText = feelsLike + Math.round(weather.main.feels_like) + "°";
            document.querySelector(".humidity").innerText = humid + weather.main.humidity + "%";
            document.querySelector(".description").innerText = descriptionUpperCase;
            getWind(deg);
            document.querySelector(".wind").innerText = windTitle + (lang == "en" ? windEn : wind) + speedText + Math.round(weather.wind.speed) + speedMetric;
            document.querySelector(".high-low").innerText = maxText + Math.round(weather.main.temp_max) + "°" + " / " + minText + Math.round(weather.main.temp_min) + "°";
        })
        .catch((err) => {
            console.log(err);
            if (err) {
                document.querySelector("#errorApi").innerHTML = "Город не найден";
            }
        });
}

function chooseCity() {
    document.querySelector("#error").innerHTML = "";
    if (document.querySelector("#city").value) {
        city = document.querySelector("#city").value;
    } else {
        document.querySelector("#error").innerHTML = lang == "en" ? errorTextEn : errorText;
    }
    getWeather(city, lang, units);
}

function setEnglish() {
    document.querySelector("#lang").value = "en";
    localStorage.setItem("lang", "en");
    lang = localStorage.getItem("lang");
    feelsLike = "Feels like: ";
    humid = "Humidity: ";
    windTitle = "Wind: ";
    speedText = ", at a speed of ";
    speedMetric = " m/s";
    maxText = "H: ";
    minText = "L: ";
    document.querySelector(".citySelect").innerHTML = `
            <label for="city">Enter city name:
                <input type="text" id="city" placeholder="city"></label>
            `;
    if (document.querySelector("#error").innerHTML) {
        document.querySelector("#error").innerHTML = errorTextEn;
    }
    // if (document.querySelector("#errorApi").innerHTML) {
    //     document.querySelector("#errorApi").innerHTML = "City not found";
    // }
}

function setRussian() {
    document.querySelector("#lang").value = "ru";
    localStorage.setItem("lang", "ru");
    lang = localStorage.getItem("lang");
    feelsLike = "Ощущается как: ";
    humid = "Влажность: ";
    windTitle = "Ветер: ";
    speedText = ", со скоростью ";
    speedMetric = "м/с";
    maxText = "Макс. t: ";
    minText = "Мин. t: ";
    document.querySelector(".citySelect").innerHTML = `
            <label for="city">Введите название города:
                <input type="text" id="city" placeholder="город"></label>
            `;
    if (document.querySelector("#error").innerHTML) {
        document.querySelector("#error").innerHTML = errorText;
    }
}

function setCelcium() {
    document.querySelector("#units").value = "c";
    localStorage.setItem("units", "metric");
    units = localStorage.getItem("units");
}

function setFahrenheit() {
    document.querySelector("#units").value = "f";
    localStorage.setItem("units", "imperial");
    units = localStorage.getItem("units");
}

document.querySelector("#lang").addEventListener("change", () => {
    switch (document.querySelector("#lang").value) {
        case "ru":
            setRussian();
            break;
        case "en":
            setEnglish();
            break;
        default:
            lang = "ru";
            break;
    }
    getWeather(city, lang, units);
});

document.querySelector("#units").addEventListener("change", () => {
    switch (document.querySelector("#units").value) {
        case "c":
            setCelcium();
            break;
        case "f":
            setFahrenheit();
            break;
        default:
            units = "metric";
            break;
    }
    getWeather(city, lang, units);
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("lang") == "en") {
        setEnglish();
    }
    if (localStorage.getItem("lang") == "ru") {
        setRussian();
    }
    if (localStorage.getItem("units") == "imperial") {
        setFahrenheit();
    }
    if (localStorage.getItem("units") == "metric") {
        setCelcium();
    }
    getWeather(city, lang, units);
});
