const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



let cityInput = 'London'; // default city when load the page 


// add click event to each city in the panel 
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // change from default city to the clicked one 
        cityInput = e.target.innerHTML;
        //  function that fetches and desplays all the data from API
        fetchWeatherData();
        // fade out the app ( simple animation )

        app.style.opacity = 0;
    });
})

// add submit event to form 

form.addEventListener('submit', (e) => {
    // if the input field / search bar / is empty ,, throw an alert 

    if (search.value.length == 0) {
        alert('please input a city Name ! ');
    } else {
        // change form default city to the one written in the input field 
        cityInput = search.value;

        // function that fetches and display all the data from API 

        fetchWeatherData();
        // remove all text from the input field 
        search.value = '';
        app.style.opacity = '0'
    }
    e.preventDefault();
});


function dayOfTheWeek(day, month, year) {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=7a29ff7906184cbc96023844221306&q=${cityInput}&aqi=yes`)

        .then(Response => Response.json())
        .then(data => {
            console.log(data);

            temp.innerHTML = data.current.temp_c + '&#176;';
            conditionOutput.innerHTML = data.current.condition.text;

            const Date = data.location.localtime;
            const y = parseInt(Date.substr(0, 4));
            const m = parseInt(Date.substr(5, 2));
            const d = parseInt(Date.substr(8, 2));
            const time = Date.substr(11)


            const iconId = data.current.condition.icon
            const cityName = data.location.name;

            dateOutput.innerHTML = `${dayOfTheWeek(d , m , y )} ${d} ${m} ${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = cityName;
            icon.src = iconId;



            cloudOutput.innerHTML = data.current.cloud + '%';
            humidityOutput.innerHTML = data.current.humidity + '%';
            windOutput.innerHTML = data.current.wind_kph + 'km/H';

            let timeOfDay = data.current.is_day;

            const code = data.current.condition.code;

            const history = [];

            btn.addEventListener('click', () => {
                history.push(cityName);
                if (search.value == '') {
                    history.pop()
                }
                console.log(history);
            })




            if (code == 1000) {
                app.style.backgroundImage = ` url(../assets/images/${timeOfDay}/clear.jpg)`;

                btn.style.background = '#e5ba92';

                if (timeOfDay == 0) {
                    btn.style.background = '#181e27'
                }
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = ` url(../assets/images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = '#fa6d1b'

                if (timeOfDay == 0) {
                    btn.style.background = '#181e27'
                }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = ` url(../assets/images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = '#647d75'
                if (timeOfDay == 0) {
                    btn.style.background = '#325c80';
                }
            } else {
                app.style.backgroundImage = ` url(../assets/images/${timeOfDay}/snow.jpg)`;
                btn.style.background = '#4d72aa';

                if (timeOfDay == 0) {
                    btn.style.background = '#1b1b1b'

                }
            }
            app.style.opacity = '1'
        })
}