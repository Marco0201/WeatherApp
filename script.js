var mykey = '10962ce66689aef9af882f3619ac6650'

let weather = {
    apiKey: mykey,//input your own api key here from openweathermap
    getweather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then(response => response.json())
            .then(data => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0]; //grabs the first icon and description from the data instead of undefined
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"; //a very specific way to find the icon img
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.trunc(temp) + "°F"; // fahrenheit is my preferred choice, also removed the decimal digits with Math.trunc()
        document.querySelector(".humidity").innerText = "Humidity: " + Math.trunc(humidity) + "%";
        document.querySelector(".speed").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading"); // hides the content until you search for a city
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + description + "')" //takes img url and inserts the city(name), same as the search bar
    },
    search: function () {
        this.getweather(document.querySelector(".search-bar").value) //this gets the content (value) inside the search bar and returns into the getweather function
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
}); //grabs the value from the search function and and adds a clickable event that lets it make able to search whatever input you give it. Ex.[ Los angeles ](search) 
//only through the button

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        weather.search()
    }
}) // This grabs the search value and only submits it when you press the enter key
